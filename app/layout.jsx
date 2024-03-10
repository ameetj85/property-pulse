import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import '@/assets/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalProvider } from '@/context/GlobalContext';

export const metadata = {
  title: 'Property Pulse | Find the perfect Rental',
  description: 'Find your dream rental property.',
  keywords: 'rentals, find rentals, dream',
};

const MainLayout = ({ children }) => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang='en'>
          <body>
            <Navbar />
            <div>{children}</div>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  );
};

export default MainLayout;
