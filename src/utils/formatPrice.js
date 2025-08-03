import React from "react";

export default function formatPrice(amount) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "INR",
	}).format(amount);
}
