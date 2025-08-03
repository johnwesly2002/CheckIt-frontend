import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { FaArrowDownShortWide, FaArrowUpShortWide } from "react-icons/fa6";
import {FormControl, InputLabel, MenuItem, Select, Tooltip } from '@mui/material';
import { RiRefreshFill } from "react-icons/ri";
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
export default function Filter({categories}) {
  const[selectedCategory, setselectedCategory] = useState("all");
  const[sortOrder, setSortOrder] = useState("asc");
  const[searchTerm, setSearchTerm] = useState("");
  const[searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  useEffect(() =>  {
    const currentCategory = searchParams.get("category") || "all";
    const currentSortOrder = searchParams.get("sortby") || "asc";
    const currentSearchTerm = searchParams.get("keyword") || "";
    setselectedCategory(currentCategory);
    setSortOrder(currentSortOrder);
    setSearchTerm(currentSearchTerm);
  },[searchParams])
  
  useEffect(() => {

    const handler = setTimeout(() => {
      if (searchTerm) {
        searchParams.set("keyword", searchTerm);
      }else {
        searchParams.delete("keyword");
      }
      navigate(`${pathname}?${searchParams.toString()}`);
    }, 700);

    return () => {
      clearTimeout(handler);
    }

  },[searchParams, searchTerm, navigate, pathname])


  const handleCategoryChange = (Event) => {
    const category = Event.target.value;
    if(category == "all") {
      params.delete("category");
    }else {
      params.set("category", category);
    }
    navigate(`${pathname}?${params}`);
    setselectedCategory(Event.target.value);
  }

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => {
      const newOrder = prevOrder === 'asc' ? "desc" : "asc";
      params.set("sortby", newOrder);
      navigate(`${pathname}?${params}`);
      return newOrder;
    });
  }

  const handleClearFilter = () => {
    navigate({pathname: window.location.pathname});
  }


  return (
    <div className='flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4'>
            <div className='relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full'>
                <input value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value)}} className='border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-1' type="text" placeholder='Search Products' />
                <CiSearch className="absolute left-3 text-slate-800" size={20}  />
            </div>
            <div className='flex sm:flex-row flex-col gap-4 items-center'>
                <FormControl className='text-slate-800 border-slate-700' variant='outlined' size='small'>
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select className='min-w-[120px] text-slate-800 border-slate-700 focus:ring-[text-bg-slate-800]' labelId="category-select-label" label="Category" value={selectedCategory} onChange={handleCategoryChange}>
                        <MenuItem value="all">All</MenuItem>
                        {categories.map((category) => (
                            <MenuItem key={category.categoryId} value={category.categoryName}>{category.categoryName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Tooltip title="Sort the Product by price in Ascending Order">
                        <button onClick={toggleSortOrder} className='flex items-center bg-slate-800 rounded-md cursor-pointer transition duration-300 ease-in shadow-md focus:outline-none px-3 py-3 gap-2'>
                            {sortOrder == 'asc' ? (<FaArrowUpShortWide size={20} color='white' />) : (<FaArrowDownShortWide size={20} color='white' />)}
                        <span className='font-semibold text-white'>Sort By</span>
                        </button>
                </Tooltip>
                <Tooltip title="Clear the Applied filter">
                <button onClick={handleClearFilter} className='flex items-center bg-slate-800 rounded-md cursor-pointer transition duration-300 ease-in shadow-md focus:outline-none px-3 py-3 gap-2'>
                    <RiRefreshFill size={20} color='white' />
                    <span className='font-semibold text-white'>Clear Filter</span>
                    </button>
                </Tooltip>
            </div>
    </div>
  )
}
