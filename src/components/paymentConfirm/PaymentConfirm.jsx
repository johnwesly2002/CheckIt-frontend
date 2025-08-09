import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import ordersuccess from '../../assets/ordersuccess.svg';
import ordererror from '../../assets/ordererror.svg';
import { FaCheckCircle } from 'react-icons/fa';
import { getStripeError, getStripeloading, stripeConfirmPayment } from '../../store/reducers/stripeSlice';
import { Link, useLocation } from 'react-router-dom';
import { getSelectedAddress } from '../../store/reducers/addressSlice';
import { getpaymentError, getpaymentLoading } from '../../store/reducers/paymentSlice';
import { HiOutlineArrowRight } from 'react-icons/hi2';
import { MdError } from "react-icons/md";
export default function PaymentConfirm() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectedAddress = useSelector(getSelectedAddress);
    const paymentMethod = useSelector((state) => state.payment.paymentMethod);
    const dispatch = useDispatch();
    const {cart} = useSelector((state) => state.carts);
    const error = useSelector(getStripeError);
    const loading = useSelector(getStripeloading)
    const paymentIntent = searchParams.get("payment_intent");
    const clientSecret = searchParams.get("payment_intent_client_secret");
    const redirectStatus = searchParams.get("redirect_status");

    useEffect(() => {
        if(paymentIntent && clientSecret && redirectStatus && cart && cart?.length > 0) {
            const payload = {
                addressId: selectedAddress.addressId,
                pgName: paymentMethod,
                pgPaymentId: paymentIntent,
                pgStatus: "succeeded",
                pgResponseMessage: "Payment Successful"
            };
            console.log(payload);
            const result = dispatch(stripeConfirmPayment(payload));
            console.log(result);
            if(stripeConfirmPayment.rejected.match(result)) {
                setError("Payment Failed, Please try again....");
            }
        }
    },[paymentIntent, clientSecret, redirectStatus, cart])

  return (
    <div className='min-h-screen flex items-center justify-center'>
        {loading ? (
           <div className='max-w-xl mx-auto'>
             <Loader />
           </div>
        ) : error ? (
             <div className='p-4 text-center max-w-md mx-auto'>
                <img src={ordererror} className="lg:h-80 md:h-60 h-45" alt="order success image" />
                <div className='text-red-500 mb-4 gap-4 flex justify-center'>
                    <MdError size={35} />
                    <h3 className='text-xl font-semibold text-black mb-2'>Payment Failed</h3>
                </div>
                <p className='text-gray-400 text-xs'>Payment Failed, Please try again.....</p>
            </div>
        ) : (
            (
            <div className='p-4 text-center flex flex-col items-center gap-3 max-w-md mx-auto'>
                <img src={ordersuccess} className="lg:h-80 md:h-60 h-45" alt="order success image" />
                <div className='text-green-500 mb-4 gap-4 flex justify-center items-center'>
                    <FaCheckCircle size={25} />
                    <h3 className='text-xl font-semibold text-black'>Payment successful</h3>
                </div>
                <p className='text-gray-400 text-xs'>Thank you for your purchase! Your payment was successful, we are processing your order.</p>
                <Link
                    to={"/orders"}
                    className="bg-gray-200 cursor-pointer text-black py-2 px-3 rounded-lg items-center transition-colors duration-300 w-36 flex gap-2 justify-center"
                >
                    View Orders
                    <HiOutlineArrowRight scale={20} />
                </Link>
            </div>
        )
        ) }
    </div>
  )
}
