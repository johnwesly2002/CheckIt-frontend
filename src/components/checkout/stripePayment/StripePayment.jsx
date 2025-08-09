import { Alert, AlertTitle } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import React, { useEffect } from "react";
import PaymentForm from "../paymentForm/PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientSecret } from "../../../store/reducers/clientSecretSlice";
import SkeletonLoader from "../../shared/Skeleton";
import { getCurrentUser } from "../../../store/reducers/authSlice";
import { getSelectedAddress } from "../../../store/reducers/addressSlice";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function StripePayment() {
	const {clientSecret, loading, error} = useSelector((state) => state.clientSecret);
	console.log(clientSecret);
	const {totalPrice} = useSelector((state) => state.carts);
	const user = useSelector(getCurrentUser);
	const selectedAddress = useSelector(getSelectedAddress);
	const dispatch = useDispatch();
	useEffect(() => {
		if(!clientSecret) {
			console.log("hello");
			const payload = {
				amount: Number(totalPrice) * 100,
				currency: "INR",
				email: user.email,
				name: `${user.username}`,
				address: selectedAddress,
				description: `Order for ${user.email}`,
				metadata: {
					test: '1'
				}
			}
			dispatch(fetchClientSecret(payload));
		}
	},[clientSecret]);

	if(loading) {
		return (
			<div className="max-w-lg mx-auto">
				<SkeletonLoader />
			</div>
		)
	}
	
	return (
		<>
			{clientSecret && (
				<Elements stripe={stripePromise} options={{clientSecret}} >
					<PaymentForm clientSecret={clientSecret} totalPrice={totalPrice} />
				</Elements>
			)}
		</>
	);
}
