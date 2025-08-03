import React, { useEffect } from "react";
import Banner from "./Banner";
import ProductCard from "../ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchProducts,
	getAllProducts,
    getProductError,
    getProductLoading,
} from "../../store/reducers/productSlice";
import Loader from "../Loader";
import { FaExclamationTriangle } from "react-icons/fa";

export default function Home() {
	const products = useSelector(getAllProducts);
	const loading = useSelector(getProductLoading);
	const error = useSelector(getProductError);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);
	return (
		<div className="lg:px-14 sm:px-8 px-4">
			<div className="py-3">
				<Banner />
			</div>
			<div className="py-1">
				<div className="flex flex-col justify-center items-center space-y-1">
					<h1 className="text-black text-3xl font-bold">Products</h1>
					<span>Discover our selection of top-rated items just for you!</span>
				</div>
			</div>
			{loading ? (
				<Loader />
			) : error ? (
				<div className="flex justify-center items-center h-[200px] gap-2">
					<FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
					<span className="text-slate-800 text-lg font-medium">{error}</span>
				</div>
			) : (
				<div className="pb-6 pt-8 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2  gap-y-6 gap-x-6">
					{products &&
						products
							?.slice(0, 8)
							.map((product, i) => <ProductCard key={i} {...product} />)}
				</div>
			)}
		</div>
	);
}
