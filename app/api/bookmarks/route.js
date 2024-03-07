import connectDB from '@/config/database';
import User from '@/models/User';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic'; // without this Vercel deployment errors.

// GET: /api/booksmarks
export const GET = async () => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required!', { status: 401 });
    }

    const { userId } = sessionUser;

    // find user in db
    const user = await User.findOne({ _id: userId });

    // get user's bookmarks
    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });

    return new Response(JSON.stringify(bookmarks), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong.', { status: 500 });
  }
};

// POST: /api/booksmarks
// add / remove bookmark
export const POST = async (req) => {
  try {
    await connectDB();

    const { propertyId } = await req.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required!', { status: 401 });
    }

    const { userId } = sessionUser;

    // find user in db
    const user = await User.findOne({ _id: userId });

    // check if property is bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);

    let message;

    if (isBookmarked) {
      // if already bookmarked, remove it
      user.bookmarks.pull(propertyId);
      message = 'Bookmark removed successfully.';
      isBookmarked = false;
    } else {
      // if not bookmarked then add it
      user.bookmarks.push(propertyId);
      message = 'Bookmark added successfully!';
      isBookmarked = true;
    }

    await user.save();

    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong.', { status: 500 });
  }
};
