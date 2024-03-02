export { default } from 'next-auth/middleware';

// Using a built-in middleware to protect routes.
export const config = {
  matcher: ['/properties/add', '/profile', '/properties/saved', '/messages'],
};
