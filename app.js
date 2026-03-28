console.log("Welcome to GENAI")
import 'dotenv/config'; 
import Groq from "groq-sdk";


//creating object , since we are taking groq , let the name be groq itself
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY }); 

async function main()
{
    const completion=await groq.chat.completions.create({
        model:"llama-3.3-70b-versatile",
        temperature:1,
        // top_p:0.2,
        // stop:"ga",
        // max_completion_tokens:1000,
        // frequency_penalty:0.1,
        // presence_penalty:0.1,
        //json mode
        response_format:{"type":"json_object"},
        messages:[
             {
                role:"system",
                content:`you are Friday,a smart review grader.Your task is to analyse given review and return the
                sentiment.Classify the review as positive,neutral or negative.outpust should only be a single word,Respond with json format`
            },
            {
                role:"user",
                content:`Review:These headphones arrived quickly and look great,but the left earcup stopped
                working after a week.
                Sentiment:`
            }
        ]
    })
    console.log(completion.choices[0].message.content);
}

main();