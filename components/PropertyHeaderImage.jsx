import React from 'react';
import Image from 'next/image';
import b1Image from '@/assets/images/properties/b1.jpg';

const PropertyHeaderImage = ({ image }) => {
  console.log('Image is ', image);
  return (
    <section>
      <div className='container-xl m-auto'>
        <div className='grid grid-cols-1'>
          <img
            src={`/images/properties/${image}`}
            alt=''
            className='object-cover h-[400px] w-full'
            width={0}
            height={0}
            sizes='100vw'
            priority={true}
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyHeaderImage;
