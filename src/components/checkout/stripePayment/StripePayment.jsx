import { Alert, AlertTitle } from "@mui/material";
import React from "react";

export default function StripePayment() {
	return (
		<div className="flex items-center justify-center mx-auto px-4">
			<Alert severity="error">
				<AlertTitle>Oops.. Payment Method is not Unavaiable</AlertTitle>
				Stripe payment is unavailable. Please use another payment method.
			</Alert>
		</div>
	);
}
