import React, { useEffect } from 'react'
import { PiShoppingBagOpenLight } from 'react-icons/pi'
import { Link } from 'react-router-dom';
import { IoBagCheckOutline } from "react-icons/io5";
import { MdArrowBack } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem.jsx';
import { getAllProducts } from '../../store/reducers/productSlice.js';
import CartEmpty from './CartEmpty.jsx';
import formatPrice from '../../utils/formatPrice.js';
export default function Cart() {
    const dispatch = useDispatch();
    const {cart} = useSelector((state) => state.carts);

    if(!cart || cart.length == 0) {
        return <CartEmpty />
    }
  return (
    <div className='lg:px-14 sm:px-8 px-4 py-10'>
        <div className='text-4xl font-black text-gray-900'>
            <div className=' flex items-center gap-3'>
                <PiShoppingBagOpenLight size={45} className='text-gray-700' />
                <h1>Your Cart</h1>
            </div>
            <p className='text-xs text-gray-600 mt-2'>All the selected items</p>
        </div>
        <div className='grid md:grid-cols-5  grid-cols-4 gap-4 font-semibold items-center mt-4'>
            <div className='md:col-span-2 justify-self-start text-lg text-black lg:ps-4'>
                Product
            </div>
            <div  className='justify-self-center text-lg text-black'>
                Price
            </div>
            <div  className='justify-self-center text-lg text-black'>
                Quantity
            </div>
            <div  className='justify-self-center text-lg text-black'>
                Total
            </div>
        </div>
        <div>
            {cart && cart.length > 0 && cart.map((item, i) => <CartItem key={i} {...item} />)}
        </div>
        <div className='border-t-[1.5px] border-slate-200 py-4 flex sm:flex-row sm:px-0 px-2 flex-col sm:justify-between gap-2'>
            <div></div>
                <div className='flex text-sm gap-1 flex-col'>
                    <div className='flex justify-between w-full md:text-lg text-sm font-semibold'>
                        <span>Subtotal</span>
                        <span>
                        {formatPrice(cart.reduce(
                            (sum, cartItem) => sum + cartItem.quantity * cartItem.specialPrice,
                            0
                        ))}</span>
                    </div>
                    <p className='text-black'>Taxes and shopping calculated at checkout</p>
                    <Link className='w-full flex justify-end' to="/checkout"><button className='font-semibold w-[300px] py-2 px-4 rounded-sm bg-black text-white flex items-center justify-center gap-2 hover:text-gray-300  transition duration-300'>
                        <IoBagCheckOutline size={20} />
                        Checkout</button></Link>
                    <Link className='flex gap-2 items-center mt-2 text-gray-500' to="/products">
                    <MdArrowBack />
                    <span>Continue shopping</span>
                    </Link>
                </div>
        </div>
    </div>
  )
}
