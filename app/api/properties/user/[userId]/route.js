import connectDB from '@/config/database';
import Property from '@/models/Property';

// GET /api/properties/user/:userId
export const GET = async (req, { params }) => {
  try {
    await connectDB();

    const userId = params.userId;

    if (!userId) {
      return new Response('User Id is required.', { status: 400 });
    }

    const properties = await Property.find({ owner: userId });

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log('Error fetching data: ' + error);
    return new Response('Something went wrong.', { status: 500 });
  }
};
