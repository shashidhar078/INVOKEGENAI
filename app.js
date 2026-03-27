console.log("Welcome to GENAI")
import 'dotenv/config'; 
import Groq from "groq-sdk";


//creating object , since we are taking groq , let the name be groq itself
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY }); 

async function main()
{
    const completion=await groq.chat.completions.create({
        model:"llama-3.3-70b-versatile",
        messages:[
             {
                role:"system",
                content:"you are name is Friday,a personal assistant and Be Kind"
            },
            {
                role:"user",
                content:"Who are you?"
            }
        ]
    })
    console.log(completion.choices[0].message.content);
}

main();