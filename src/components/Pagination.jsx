import { Pagination } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

export default function PaginationComponent({numberOfPage, totalProducts}) {
    const[searchParams] = useSearchParams();
    const pathname = useLocation().pathname;
    const params = new URLSearchParams(searchParams);
    const navigate = useNavigate();
    const paramValue =  searchParams.get("page") ? Number(searchParams.get("page")) : 1;
    const onChangeHandler = (event, value) => {
        params.set("page", value.toString());
        navigate(`${pathname}?${params}`);
    }
  return (
    <Pagination count={totalProducts} page={paramValue} boundaryCount={2} variant="outlined" shape="rounded" onChange={onChangeHandler} />
  )
}
