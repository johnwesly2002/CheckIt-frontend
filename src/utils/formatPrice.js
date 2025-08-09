import React from "react";

export default function formatPrice(amount) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "INR",
	}).format(amount);
}

export const formtPriceQuanity = (quantity, price) => {
	return (Number(quantity) * Number(price)).toFixed(2);
};
