import React, { useEffect } from 'react'
import ProductCard from './ProductCard';
import { FaExclamation, FaExclamationTriangle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {getAllProducts, getPagination, getProductError, getProductLoading } from '../store/reducers/productSlice';
import Filter from './Filter';
import useProductFilter from '../hooks/useProductFilter';
import { fetchCategories, getAllCategories } from '../store/reducers/categorySlice';
import Loader from './Loader';
import PaginationComponent from './Pagination';
export default function Products() {
    const loading = useSelector(getProductLoading);
    const error = useSelector(getProductError);
    const products = useSelector(getAllProducts);
    const productPagination = useSelector(getPagination);
    const categories = useSelector(getAllCategories);
    const dispatch = useDispatch();
    useProductFilter();

    useEffect(() => {
        dispatch(fetchCategories());
    },[]);

  return (
    <div className='lg:px-14 sm:px-8 px-4 py-14 2xl:w-[100%] 2xl:mx-auto'>
        <Filter categories={categories ? categories : []} />
        {
            loading ? (
                <Loader  />
            ) : error ? (
                <div className='flex justify-center items-center h-[200px] gap-2'>
                    <FaExclamationTriangle className='text-slate-800 text-3xl mr-2'  />
                    <span className='text-slate-800 text-lg font-medium'>{error}</span>
                </div>
            ) : (
                <div className='min-h-[700px]'>
                    <div className='pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2  gap-y-6 gap-x-6'>
                        {products && 
                        products.map((product, i) => <ProductCard key={i} {...product} />)}
                    </div>
                    <div className='flex justify-center items-center'>
                        <PaginationComponent numberOfPage={productPagination.totalElements} totalProducts={productPagination.totalPages} />
                    </div>
                </div>
            )
        }
    </div>
  )
}
