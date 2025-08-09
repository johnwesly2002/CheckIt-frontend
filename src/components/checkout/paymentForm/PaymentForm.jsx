import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
import SkeletonLoader from '../../shared/Skeleton';
import { useSelector } from 'react-redux';

export default function PaymentForm({clientSecret, totalPrice}) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!stripe || !elements) {
      return;
    }
    const{error: submitError} = await elements.submit();

    const{error} = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${import.meta.env.VITE_FRONTEND_URL}/order-confirm`,
      },
    });
    if(error) {
      setError(error.message);
      return false;
    }
  }

  const loading = !clientSecret || !stripe || !elements;

  const paymentElementOptions = {
    layout: "tabs",
  }

  return (
   <form onSubmit={handleSubmit} className='mx-w-lg mx-auto p-8'>
        <h2 className='text-xl font-semibold mb-4'>Payment Information</h2>
        {loading ? (
            <>
            <SkeletonLoader />
            </>
        ) : (
            <>
            {clientSecret && <PaymentElement options={paymentElementOptions} />}
            {error && (
                <div className='text-red-500 mt-2'>{error}</div>
            )}
           <button disabled={loading || !stripe} type="submit" className={` ${(loading || !stripe) ? 'bg-gray-500' : 'bg-black'}   flex gap-2 items-center justify-center font-semibold  my-3 text-white hover:text-white/80 transition-colors duration-100 rounded-sm  py-2 w-36`}>
            {loading ? (<>Paying...</>) : `Pay ₹${Number(totalPrice).toFixed(2)}` }</button>
            </>
        )}
   </form>
  )
}
