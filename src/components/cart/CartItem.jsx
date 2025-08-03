import React, { useEffect, useState } from "react";
import Truncatetext from "../../utils/Truncatetext.js";
import { IoBagRemove } from "react-icons/io5";
import SetQuantity from "./setQuantity.jsx";
import {
	DecreaseQuantity,
	increaseQuantity,
	isQntAvailable,
} from "../../store/reducers/cartReducer.js";
import { removeCartItem } from "../../../../../../Redux_Related/Redux Js/store/slices/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, getAllProducts } from "../../store/reducers/productSlice.js";
import toast from "react-hot-toast";
import formatPrice from "../../utils/formatPrice.js";
export default function CartItem({
	productId,
	productName,
	image,
	productDescription,
	quantity,
	price,
	discount,
	specialPrice,
}) {
	const dispatch = useDispatch();
	const {cart} = useSelector((state) => state.carts);
    const products =  useSelector(getAllProducts);

	useEffect(() => {
		dispatch(fetchProducts());
	},[]);


	const handleQtyIncrease = (cartItems) => {
	const available = isQntAvailable(cart, products, cartItems.productId);
	if (available) {
		dispatch(increaseQuantity(cartItems));
	} else {
		toast.error("Quantity reached limit");
	}
	};
	const handleQtyDecrease = (cartItems) => {
		dispatch(DecreaseQuantity(cartItems))
	};

	const removeItemFromCart = (cartItems) => {
		dispatch(removeCartItem(cartItems));
	};
	return (
		<div className="grid md:grid-cols-5 grid-cols-4 md:text-md text-sm gap-4 items-center border-[1px] border-gray-200 ">
			<div className="md:col-span-2 justify-self-start flex  flex-col gap-2 p-4 ">
				<div className="flex md:flex-row flex-col lg:gap-4 sm:gap-3 gap-0 items-start">
					<h3 className="lg:text-[17px] text-sm font-semibold text-slate-600">
						{Truncatetext({ text: productName })}
					</h3>
				</div>
				<div className="md:w-36 sm:w-24 w-12">
					<img
						src={image}
						alt={productName}
						className="md:h-36 sm-h-24 h-12 w-full object-cover rounded-md"
					/>
				</div>
				<div className="flex items-center gap-5 mt-3">
					<button
						onClick={() => {
							removeItemFromCart({
							image,
							productName,
							productDescription,
							specialPrice,
							price,
							productId,
							quantity,
							})
						}}
						className="flex items-center font-semibold space-x-2 px-4 py-2 gap-2 text-xs rounded-md bg-black/85 text-white hover:bg-gray-700 trasition duration-500"
					>
						<IoBagRemove size={15} /> Remove
					</button>
				</div>
			</div>
			<div className="justify-self-center lg:text-[17px] text-sm text-black font-semibold ">
				{formatPrice(Number(specialPrice))}
			</div>
			<div className="justify-self-center lg:text-[17px] text-sm text-black font-semibold ">
				<SetQuantity
					quantity={quantity}
					cardCounter={true}
					handleQtyIncrease={() => {
						handleQtyIncrease({
							image,
							productName,
							productDescription,
							specialPrice,
							price,
							productId,
							quantity,
						});
                    }}
					handleQtyDecrease={() => {
						handleQtyDecrease({
							image,
							productName,
							productDescription,
							specialPrice,
							price,
							productId,
							quantity,
						});
					}}
				/>
			</div>
			<div className="justify-self-center lg:text-[17px] text-sm text-black font-semibold ">
				{formatPrice(Number(quantity) * Number(specialPrice))}
			</div>
		</div>
	);
}
