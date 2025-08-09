import { Alert, AlertTitle } from '@mui/material'
import React from 'react'

export default function RazorPayPayment() {
	return (
		<div>
			<div className="flex items-center justify-center mx-auto px-4">
				<Alert severity="error">
					<AlertTitle>Oops.. Payment Method is not Unavaiable</AlertTitle>
					RazorPay payment is unavailable. Please use another payment method.
				</Alert>
			</div>
		</div>
	);
}
