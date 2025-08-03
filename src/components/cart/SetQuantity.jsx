import React from 'react'

export default function SetQuantity({
    quantity,
    cardCounter,
    handleQtyIncrease,
    handleQtyDecrease,
}) {
  return (
    <div className='flex gap-8 items-center'>
        {cardCounter ? null : <div className='font-semibold'>Quantity</div>}
        <div className='flex md:flex-row flex-col gap-4 items-center lg:text-[22px] text-sm'>
            <button  className='border-[1.2px] border-gray-300  px-3 py-1 rounded text-center' onClick={handleQtyDecrease}>-</button>
            <div className='text-black'>{quantity}</div>
             <button className='border-[1.2px] border-gray-300  px-3 py-1 rounded text-center' onClick={handleQtyIncrease}>+</button>
        </div>
    </div>
  )
}
