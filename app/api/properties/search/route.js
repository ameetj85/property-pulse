import connectDB from '@/config/database';
import Property from '@/models/Property';

export const dynamic = 'force-dynamic';

// GET /api/properties/search
export const GET = async (req) => {
  try {
    await connectDB();

    let location = '';

    const { searchParams } = new URL(req.url);
    const tempLocation = searchParams.get('location');
    const propertyType = searchParams.get('propertyType');

    // if location is not returned correctly,
    // i.e. iyt contans the url, then strip out everything
    // until and including ?
    if (tempLocation.includes('?')) {
      location = tempLocation.split('?')[1].split('=')[1];
      // console.log('location:', location);
    } else {
      location = tempLocation;
    }

    const locationPattern = new RegExp(location, 'i');

    // match location pattern against db fields
    let query = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { 'location.street': locationPattern },
        { 'location.city': locationPattern },
        { 'location.state': locationPattern },
        { 'location.zipcode': locationPattern },
      ],
    };

    // only check for property type if it is not All
    if (propertyType && propertyType !== 'All') {
      const typePattern = new RegExp(propertyType, 'i');
      query.type = typePattern;
    }

    // console.log(query);

    const properties = await Property.find(query);

    // console.log(properties);

    return new Response(JSON.stringify(properties, { status: 200 }));
  } catch (error) {
    console.log(error);
    return new Response('Error', { status: 500 });
  }
};
