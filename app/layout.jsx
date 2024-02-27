import React from 'react';
import '@/assets/styles/globals.css';
import Navbar from '@/components/navbar';

export const metadata = {
  title: 'Property Pulse | Find the perfect Rental',
  description: 'Find your dream rental property.',
  keywords: 'rentals, find rentals, dream',
};

const MainLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <Navbar />
        <div>{children}</div>
      </body>
    </html>
  );
};

export default MainLayout;
