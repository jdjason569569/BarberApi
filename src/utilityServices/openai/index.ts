//import OpenAI from "openai";
import "dotenv/config"
import { generatePrompt } from "./prompt";

// const openai = new OpenAI({
//     apiKey:process.env.OPENAI_API_KEY ,
// });

/**
 * 
 * @param quetion
 */
const run = async (question: string): Promise<string> => {

    // const promtp = generatePrompt(question)
    // const response = await openai.chat.completions.create({
    //     model: "gpt-3.5-turbo",
    //     messages: [
    //         {
    //             "role": "system",  
    //             "content": promtp                  //promtp  
    //         },
    //     ],
    //     temperature: 1,
    //     max_tokens: 800,
    //     top_p: 1,
    //     frequency_penalty: 0,
    //     presence_penalty: 0,
    // });
    // const contenidoJSON = JSON.stringify(response.choices[0].message.content);
    return null          //contenidoJSON
}

export { run }


