console.log("Welcome to GENAI")
import 'dotenv/config'; 
import Groq from "groq-sdk";


//creating object , since we are taking groq , let the name be groq itself
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY }); 

async function main()
{
    const completion=await groq.chat.completions.create({
        model:"llama-3.3-70b-versatile",
        temperature:0,
        messages:[
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
        ],
        // Sample request body with tool definitions and messages
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
     
    // console.log(JSON.stringify(completion.choices[0].message));

    const toolcalls=completion.choices[0].message.tool_calls

if(!toolcalls)
{
    console.log(`AI completions : ${completion.choices[0].message.content}`)
    return; 
}

    

for(const tool of toolcalls)
{
    console.log("tool : ",tool);
    const functionName=tool.function.name;
    const functionParam=tool.function.arguments;

    if(functionName=='webSearch')
    {
       const result=await webSearch(JSON.parse(functionParam));
        console.log("tool result : ",result)
    }
}

}


main();

async function webSearch({query})
{
    console.log("Tool calling>>>>>")
    return "Iphone 16 was launched in the year of 2024."
}
