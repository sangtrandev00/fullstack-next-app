


import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt';

export const GET = async(req: Request, {params}: {params: {id: string}}) => {

    try {
        await connectToDB();

        const PromptsByUserId = await Prompt.find({ creator: params.id }).populate('creator');

        return new Response(JSON.stringify(PromptsByUserId), { 
            status: 200,
        });

    } catch (error) {
        return new Response("Failed to get prompts of user ", { 
            status: 500
         });
    }
  
}