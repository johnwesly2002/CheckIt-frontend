import React, { useEffect, useState } from "react";
import products from "../constants/demoproducts";
import { FaShoppingBasket, FaShoppingCart } from "react-icons/fa";
import ProductViewPage from "./ProductViewPage";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, isQntAvailable } from "../store/reducers/cartReducer";
import toast from 'react-hot-toast';
import { getAllProducts } from "../store/reducers/productSlice";
import formatPrice from '../utils/formatPrice.js';
export default function ProductCard({
	productId,
	productName,
	image,
	productDescription,
	quantity,
	price,
	discount,
	specialPrice,
	notLogin,
}) {
	const [openProductView, setOpenProductView] = useState(false);
	const btnLoader = false;
	const [selectedViewProduct, setSelectedViewProduct] = useState("");
	const isAvailable = quantity && Number(quantity) > 0;
	const dispatch = useDispatch();
	const products = useSelector(getAllProducts);
	const {cart} = useSelector(state => state.carts);

	const handleProductView = (product) => {
		if (!notLogin) {
			setSelectedViewProduct(product);
			setOpenProductView(true);
		}
	};

	const addToCartHandler = (cartItems) => {
		const available = isQntAvailable(cart, products, cartItems.productId);
		if (available) {
			dispatch(addCartItem(cartItems));
		} else {
			toast.error("Quantity reached limit");
		}
	}

	return (
		<div className="border rounded-lg shadow-xs overflow-hidden transition-shadow duration-300">
			<div
				onClick={() => {
					handleProductView({
						productId,
						productName,
						image,
						productDescription,
						quantity,
						price,
						discount,
						specialPrice,
					});
				}}
				className="w-full overflow-hidden aspect-[3/2]"
			>
				<img
					className="w-full h-full object-cover cursor-pointer transition-transform duration-300 transform hover:scale-105"
					src={image}
					alt={productName}
				/>
			</div>
			<div className="p-4">
				<h2
					onClick={() => {
						handleProductView({
							productId,
							productName,
							image,
							productDescription,
							quantity,
							price,
							discount,
							specialPrice,
						});
					}}
					className="font-semibold text-lg  mb-2 cursor-pointer"
				>
					{productName}
				</h2>

				<div className="min-h-15 max-h-15">
					<p className="text-gray-600 text-sm">{productDescription}</p>
				</div>
				{!notLogin && (
					<div className="flex items-center justify-between">
						{specialPrice ? (
							<div className="flex flex-col">
								<span className="text-gray-400 line-through">
									{formatPrice(Number(price))}
								</span>
								<span className="text-xl font-bold text-slate-700">
									{formatPrice(Number(price))}
								</span>
							</div>
						) : (
							<div className="flex flex-col">
								<span className="text-gray-400">
									{"  "}{formatPrice(Number(price))}
								</span>
							</div>
						)}
						<button
							disabled={!isAvailable || btnLoader}
							onClick={() => addToCartHandler({
								productId,
								productName,
								image,
								productDescription,
								quantity,
								price,
								discount,
								specialPrice
							})}
							className={`bg-gray-200 ${
								isAvailable ? "opacity-100 hover:bg-gray-300" : "opacity-70"
							} text-black py-2 px-3 rounded-lg items-center transition-colors duration-300 w-36 flex justify-center`}
						>
							<FaShoppingCart className="mr-2" />
							{isAvailable ? "Add to Cart" : "Stock Out"}
						</button>
					</div>
				)}
			</div>
			<ProductViewPage
				open={openProductView}
				setOpen={setOpenProductView}
				product={selectedViewProduct}
				isAvailable={isAvailable}
			/>
		</div>
	);
}
