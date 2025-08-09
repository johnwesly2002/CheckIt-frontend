import { Divider } from '@mui/material';
import React from 'react'
import formatPrice, { formtPriceQuanity } from '../../../utils/formatPrice';
export default function OrderSummary({totalPrice, cart, address, paymentMethod}) {
  const{buildingName, street, city, state, country, pincode} = address;
  return (
    <div className='container mx-auto px-4'>
        <div className='flex flex-wrap'>
            <div className='w-full lg:w-8/12 pr-4'>
                <div className='space-y-4'>
                    <div className='p-4 border rounded-lg shadow-sm'>
                        <h2 className='text-xl font-semibold mb-2'>Billing Address</h2>
                        <Divider />
                        <p>
                            <strong>Building Name </strong>
                            {buildingName}
                        </p>
                        <p>
                            <strong>Street </strong>
                            {street}
                        </p>
                        <p>
                            <strong>City </strong>
                            {city} - {pincode}
                        </p>
                        <p>
                            <strong>State </strong>
                            {state}
                        </p>
                        <p>
                            <strong>Country </strong>
                            {country}
                        </p>
                    </div>
                    <div className='p-4 border rounded-lg shadow-sm'>
                        <h2 className='text-xl font-semibold mb-2'>Payment Method</h2>
                        <p>
                            <strong>Method </strong>
                            {paymentMethod}
                        </p>
                    </div>
                    <div className='p-4 border rounded-lg shadow-sm'>
                        <h2 className='text-xl font-semibold mt-2'> 
                            Order Items
                        </h2>
                        <div className='space-y-2'>
                            {
                                cart?.map((item) => (
                                    <div key={item?.productId} className='flex items-center'>
                                        <img className='w-20 h-20 rounded' src={`${import.meta.env.VITE_BACKEND_URL}/images/${item?.image}`} alt={item.productName} />
                                        <div className='text-gray-500'>
                                            <p>{item?.productName}</p>
                                            <p>{item?.quantity} X  ₹{item?.specialPrice} =  ₹{formtPriceQuanity(item?.quantity , item?.specialPrice)}  </p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

           <div className="w-full lg:w-4/12 mt-4 lg:mt-0">
          <div className="border rounded-lg shadow-xs p-4 space-y-4">
            <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
            <Divider />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Products</span>
                <span>₹{formtPriceQuanity(totalPrice, 1)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (0%)</span>
                <span>₹0.00</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>SubTotal</span>
                <span>₹{formtPriceQuanity(totalPrice, 1)}</span>
              </div>
            </div>
        </div>
        </div>
        </div>
    </div>
  )
}
