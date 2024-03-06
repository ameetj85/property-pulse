import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';

// GET /api/properties/:id
export const GET = async (req, { params }) => {
  try {
    await connectDB();

    const property = await Property.findById(params.id);

    if (!property) {
      return new Response('Property Not Found.', { status: 404 });
    }

    return new Response(JSON.stringify(property));
  } catch (error) {
    console.log('Error fetching data: ' + error);
    return new Response('Something went wrong.', { status: 500 });
  }
};

// DELETE /api/properties/:id
export const DELETE = async (req, { params }) => {
  try {
    const propertyId = params.id;

    const session = await getSessionUser();

    // console.log('Session', session);

    if (!session || !session.userId) {
      return new Response('User ID is required.', { status: 401 });
    }

    const { userId } = session.userId;

    await connectDB();

    const property = await Property.findById(propertyId);

    // console.log('Property:', property);
    console.log('Property owner:', property.owner.toString());
    console.log('Session User Id:', session.userId);

    if (!property) {
      return new Response('Property Not Found.', { status: 404 });
    }

    // verify that the user id fpor the property mayches the user id of the user that is logged in
    if (property.owner.toString() !== userId) {
      return new Response('Unauthorised!', { status: 401 });
    }

    await property.deleteOne();
    // Property.deleteOne({ _id: property._id });

    return new Response('Property deleted.', { staus: 200 });
  } catch (error) {
    console.log('Error deleting property: ' + error);
    return new Response('Something went wrong.', { status: 500 });
  }
};
