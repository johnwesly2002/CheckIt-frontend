import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getpaymentError, getpaymentLoading, setPaymentMethod } from '../../../store/reducers/paymentSlice';
import { CreateUserCart, getCartId, getUserCart } from '../../../store/reducers/cartReducer';

export default function PaymentMethod() {
  const paymentMethod = useSelector(state => state.payment.paymentMethod);
  const cartId = useSelector(getCartId);
  const cart = useSelector(getUserCart);
  const error = useSelector(getpaymentError);
  const loading = useSelector(getpaymentLoading);
  const dispatch = useDispatch();
  const handleChange = (method) => {
    console.log(method);
    dispatch(setPaymentMethod(method));
  }

  useEffect(() => {
	if(cart.length > 0 && !cartId && !error) {
		const sendCartItems = cart.map((item) => {
			return {
				productId: item.productId,
				quantity: item.quantity
			}
		});
		dispatch(CreateUserCart(sendCartItems));
	}
  },[dispatch, cartId]);


  return (
		<div className="max-w-md mx-auto p-5 bg-white shadow-md rounded-md mt-16 border">
			<h1 className="text-xl font-semibold mb-2">Select Payment Method</h1>
			<FormControl>
				<RadioGroup
					aria-label="payment method"
					name="paymentMethod"
					value={paymentMethod}
					onChange={(e) => handleChange(e.target.value)}
				>
					<FormControlLabel
						value="Stripe"
						control={
							<Radio
								sx={{
									"&.Mui-checked": {
										color: "black", // checked state
									},
								}}
							/>
						}
						label="Stripe"
						className="text-gray-700"
					/>
					<FormControlLabel
						value="RazorPay"
						control={
							<Radio
								sx={{
									"&.Mui-checked": {
										color: "black", // checked state
									},
								}}
							/>
						}
						label="Razorpay"
						className="text-gray-700"
					/>
				</RadioGroup>
			</FormControl>
            <p className='text-gray-500 text-xs'>Note: Payment Methods will be based on the country</p>
		</div>
	);
}
