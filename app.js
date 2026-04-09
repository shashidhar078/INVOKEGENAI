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

// import Groq from "groq-sdk";
// import 'dotenv/config'; 
// import { z } from "zod";

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// const supportTicketSchema = z.object({
//   category: z.enum(["api", "billing", "account", "bug", "feature_request", "integration", "security", "performance"]),
//   priority: z.enum(["low", "medium", "high", "critical"]),
//   urgency_score: z.number(),
//   customer_info: z.object({
//     name: z.string(),
//     company: z.string().optional(),
//     tier: z.enum(["free", "paid", "enterprise", "trial"])
//   }),
//   technical_details: z.array(z.object({
//     component: z.string(),
//     error_code: z.string().optional(),
//     description: z.string()
//   })),
//   keywords: z.array(z.string()),
//   requires_escalation: z.boolean(),
//   estimated_resolution_hours: z.number(),
//   follow_up_date: z.string().datetime().optional(),
//   summary: z.string()
// });

// // type SupportTicket = z.infer<typeof supportTicketSchema>;

// const response = await groq.chat.completions.create({
//   model: "openai/gpt-oss-120b",
//   messages: [
//     {
//       role: "system",
//       content: `You are a customer support ticket classifier for SaaS companies. 
//                 Analyze support tickets and categorize them for efficient routing and resolution.
//                 Output JSON only using the schema provided.`,
//     },
//     { 
//       role: "user", 
//       content: `Hello! I love your product and have been using it for 6 months. 
//                 I was wondering if you could add a dark mode feature to the dashboard? 
//                 Many of our team members work late hours and would really appreciate this. 
//                 Also, it would be great to have keyboard shortcuts for common actions. 
//                 Not urgent, but would be a nice enhancement! 
//                 Best, Mike from StartupXYZ`
//     },
//   ],
//   response_format: {
//     type: "json_schema",
//     json_schema: {
//       name: "support_ticket_classification",
//       schema: z.toJSONSchema(supportTicketSchema)
//     }
//   }
// });

// const rawResult = JSON.parse(response.choices[0].message.content || "{}");
// const result = supportTicketSchema.parse(rawResult);
// console.log(JSON.stringify(result));
// console.log(result);