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
                content:`you are a smart personal assistant,who answer the asked questions`
             },
            {
                role:"user",
                content:`When apple 16 was launched?`
            }
        ]
    })
    console.log(completion.choices[0].message.content);
}

main();