import React from 'react'
import aboutus from '../../assets/aboutus.svg'
export default function About() {
  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
        <h1 className='text-slate-800 text-4xl font-bold text-center mb-12'>
            About Us
        </h1>
        <div className='flex flex-col lg:flex-row justify-between items-center mg-12'>
            <div className="w-full md:w-1/2 text-center md:text-left">
               <p className="text-lg mb-4">
                        Welcome to our CheckIt store! We are dedicated to providing the
                        best products and services to our customers. Our mission is to offer
                        a seamless shopping experience while ensuring the highest quality of
                        our offerings.
                    </p>
            </div>
            <div className='w-full md:w-1/2 text-center mb-6 md:mb-0' >
                <img src={aboutus} alt="About us" className='w-full h-auto rounded-lg tranform transition-transform duration-300' />
            </div>
            
        </div>
    </div>
  )
}
