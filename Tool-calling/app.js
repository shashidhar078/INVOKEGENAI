console.log("Welcome to GENAI")
import 'dotenv/config'; 
import Groq from "groq-sdk";
import {tavily} from "@tavily/core"

const tavilysearch = tavily({ apiKey: process.env.TAVILY_API_KEY });

//creating object , since we are taking groq , let the name be groq itself
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY }); 

async function main()
{
    let messages=[
                {
                    role:"system",
                    content:`you are a smart personal assistant,who answer the asked questions
                    you have access to the following tools :
                        "description": "Search for the latest information and realtime data on the internet",
                    1.webSearch({query}:{query:String})  //`
                },
                {
                    role:"user",
                    content:`When apple 16 was launched?`
                }
            ]


    while(true)
    {
        
        const completion=await groq.chat.completions.create({
            model:"llama-3.3-70b-versatile",
            temperature:0,
            // Sample request body with tool definitions and messages
                messages:messages,
                tools: [
                {
                    "type": "function",
                    "function": {
                        "name": "webSearch",
                        "description": "Search for the latest information and realtime data on the internet",
                        "parameters": {
                        // JSON Schema object
                        "type": "object",
                        "properties": {
                            "query": {
                            "type": "string",
                            "description": "search query to perform search on "
                            },
                        },
                        "required": ["query"]
                        }
                    }
                }
            ],
            tool_choice:'auto' 
        })
        
        messages.push(completion.choices[0].message)// to maintain the history that called tool
        // console.log(JSON.stringify(completion.choices[0].message));

        const toolcalls=completion.choices[0].message.tool_calls

    if(!toolcalls)
    {
        console.log(`AI completions : ${completion.choices[0].message.content}`)
        break; 
    }

        

    for(const tool of toolcalls)
    {
        console.log("tool : ",tool);
        const functionName=tool.function.name;
        const functionParam=tool.function.arguments;

        if(functionName=='webSearch')
        {
        const result=await webSearch(JSON.parse(functionParam));
            // console.log("tool result : ",result)
            messages.push({
            role: "tool",
            tool_call_id: tool.id,
            content: result
            })
        }
    }
    //  const completion2=await groq.chat.completions.create({
    //         model:"llama-3.3-70b-versatile",
    //         temperature:0,
    //         messages:messages,
    //         // Sample request body with tool definitions and messages
    //             tools: [
    //             {
    //                 "type": "function",
    //                 "function": {
    //                     "name": "webSearch",
    //                     "description": "Search for the latest information and realtime data on the internet",
    //                     "parameters": {
    //                     // JSON Schema object
    //                     "type": "object",
    //                     "properties": {
    //                         "query": {
    //                         "type": "string",
    //                         "description": "search query to perform search on "
    //                         },
    //                     },
    //                     "required": ["query"]
    //                     }
    //                 }
    //             }
    //         ],
    //           tool_choice:'auto' 
    //     })
        
        
        console.log(JSON.stringify(completion.choices[0].message));

}
}


main();

async function webSearch({query})
{
    console.log("Tool calling>>>>>")

    const response=await tavilysearch.search(query);
    const finalResult=response.results.map((result)=>result.content).join("\n\n")
    // console.log(finalResult);

    return finalResult;
}
