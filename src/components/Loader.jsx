import React from 'react'
import Lottie from 'react-lottie';
import animationData from '../assets/loader.json';
export default function Loader({text}) {
  return (
    <div className='flex justify-center items-center w-full h-[450px]'>
       <div className='flex flex-col items-center gap-1'>
         <Lottie
        height={100}
        width={100}
        options = {{
            animationData: animationData,
            autoplay: true,
            loop: true
        }}
        />
        <h4 className='text-black'>{text ? text : 'Loading....'}</h4>
       </div>
    </div>
  )
}
