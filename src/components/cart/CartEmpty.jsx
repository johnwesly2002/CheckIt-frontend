import React from 'react'
import cartEmpty from '../../assets/cartEmpty2.svg';
import { MdArrowBack } from "react-icons/md";
import { Link } from 'react-router-dom';
export default function CartEmpty() {
  return (
    <div className='flex justify-center items-center flex-col gap-2 lg:px-14 sm:px-8 px-4 py-10'>
        <img className='min-h-[200px] max-h-[400px]' src={cartEmpty} alt="cartEmpty" />
        <h1 className='text-2xl font-semibold '>Your Cart is Empty...</h1>
        <h4 className='text-md font-medium text-gray-600 '>Add some products to get started...</h4>
        <Link className=' flex justify-center items-center gap-2 mt-2 text-md font-medium text-gray-600' to='/products'>
            <MdArrowBack size={20} />
            <span className='text-sm ' >Continue Shopping</span>
        </Link>

    </div>
  )
}
