


import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt';

export const GET = async(req: Request, res: Response) => {

    try {
        await connectToDB();

        const Prompts = await Prompt.find().populate('creator');

        return new Response(JSON.stringify(Prompts), { 
            status: 200,
        });

    } catch (error) {
        return new Response("Failed to get all prompts", { 
            status: 500
         });
    }
  
}