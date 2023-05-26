/* eslint-disable import/prefer-default-export */
import connectToDB from 'utils/database';
import Prompt from 'models/prompt';

export const GET = async (_req, { params }) => {
    try {
        await connectToDB();
        const prompts = await Prompt.find({ creator: params.id }).populate(
            'creator'
        );
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (err) {
        return new Response('Failed to fetch posts', { status: 500 });
    }
};
