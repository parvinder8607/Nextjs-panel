import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import image from "@/assets/images/panel.png";
const HeroSection = () => {
    return (<section className='w-full h-screen'>
        <div className="container mx-auto h-full flex ">
          <div className="w-full lg:w-1/2 h-full flex flex-col justify-center">
            <h1 className='text-5xl font-bold mb-4'>    
                Schema-Based Data Management Panel
            </h1>
            <h4 className='text-lg text-gray-600 mb-6'>
                Efficiently manage, validate and organize your data with our powerful schema-driven interface
            </h4>
            <div className='space-y-4'>
                <p className='text-gray-700'>
                    ✓ Dynamic form generation based on JSON schemas
                </p>
                <p className='text-gray-700'>
                    ✓ Real-time data validation and error handling
                </p>
                <p className='text-gray-700'>
                    ✓ Customizable data models and relationships
                </p>
                <p className='text-gray-700'>
                    ✓ Built with Next.js for optimal performance
                </p>
            </div>
            <div className="">
              <Link href={'/admin'}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4 ">
                  Visit Panel
                </button>
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center p-4">
            <div className="w-full  border border-gray-200 shadow-2xl rounded-lg overflow-hidden bg-black/85">
            <div className="flex gap-1 px-2 py-1">
              <span className='inline-block w-4 aspect-square  rounded-full bg-red-400'></span>
              <span className='inline-block w-4 aspect-square  rounded-full bg-green-400'></span>
              <span className='inline-block w-4 aspect-square  rounded-full bg-blue-400'></span>
            </div>
            <div className="relative w-full   ">
            <Image src={image} alt='panel image' width={1912} height={947}/>
            </div>
            </div>
          </div>
        </div>
    </section>);
};
export default HeroSection;
