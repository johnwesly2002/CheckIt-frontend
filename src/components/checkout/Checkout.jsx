import { Step, StepLabel, Stepper } from '@mui/material'
import React, { useState } from 'react'
import AddressInfo from './addressInfo/AddressInfo';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import PaymentMethod from './paymentMethod/PaymentMethod';
import OrderSummary from './orderSummary/OrderSummary';
import StripePayment from './stripePayment/StripePayment';
import RazorPayPayment from './paypal/RazorPayPayment';
import { HiOutlineArrowSmallRight } from "react-icons/hi2";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const selectedAddress = useSelector((state) => state.address.selectedAddress);
  const paymentMethod = useSelector(state => state.payment.paymentMethod);
  const {cart,totalPrice} = useSelector(state => state.carts);
  const steps = [
    "Address",
    "Payment Method",
    "Order Summary",
    "Payment"
  ];
  const handleNext = () => {
    if(activeStep === 0 && !selectedAddress) {
      toast.error("Please select checkout address before proceed further.");
    }
    if(activeStep === 1 && (!selectedAddress || !paymentMethod)) {
      toast.error("Please select payment address before proceed further.");
    }
    
    setActiveStep(prev => prev + 1);
  }
  return (
		<div className="py-14 min-h-[calc(100vh-100px)]">
			<Stepper activeStep={activeStep} alternativeLabel>
				{steps.map((label, index) => (
					<Step
						key={index}
						sx={{
							"& .MuiStepLabel-root .Mui-active": { color: "black" },
						}}
					>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
			<div className="mt-5">{activeStep == 0 && <AddressInfo />}</div>
			<div className="mt-5">{activeStep == 1 && <PaymentMethod />}</div>
			<div className="mt-5">{activeStep == 2 && <OrderSummary totalPrice={totalPrice} cart={cart} address={selectedAddress} paymentMethod={paymentMethod} />}</div>
			<div className="mt-5">{activeStep == 3  ?  paymentMethod === 'Stripe' ? <StripePayment /> : <RazorPayPayment /> : null}</div>

			<div style={{boxShadow: "0 -2px 4px rgba(100, 100, 100, 0.15)"}} className="flex justify-between items-center px-4 fixed z-50 h-24 bottom-0 bg-white left-0 w-full py-3 border-gray-400">
				<button
					onClick={() => setActiveStep(prev => prev - 1)}
          disabled={activeStep == 0}
					className="bg-gray-200 cursor-pointer text-black py-2 px-3 rounded-sm items-center transition-colors duration-300 w-36 flex gap-2 justify-center"
				>
					<HiOutlineArrowSmallLeft scale={20} />
					Previous
				</button>
				{activeStep !== steps.length - 1 && (
          <button
					type="submit"
          onClick={handleNext}
          disabled={
            (activeStep === 0 ? !selectedAddress : activeStep === 1 ? !paymentMethod : false)
          }
					className={` flex gap-2 items-center justify-center cursor-pointer font-semibold bg-black my-3 text-white hover:text-white/80 transition-colors duration-100 rounded-sm  py-2 w-36
          ${
            (activeStep === 0 && !selectedAddress) || 
            (activeStep === 1 && !paymentMethod)
           ? "opacity-60" : ''}`}
				>
					Next
					<HiOutlineArrowSmallRight scale={20} />
				</button>
        )}
			</div>
		</div>
	);
}
