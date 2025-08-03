import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/CheckIt_Logo.png';
import { Badge } from '@mui/material';
import { CiMenuFries } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { PiSignInDuotone } from "react-icons/pi";
import { BsHandbagFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../store/reducers/authSlice';
import { BsPersonCircle } from "react-icons/bs";
import UserMenu from './userMenu/UserMenu.jsx';
export default function NavBar() {
    const path = useLocation().path;
    const [navbarOpen, setNavbarOpen] = useState(false);
    const {cart} = useSelector((state) => state.carts);
    const user = useSelector(getCurrentUser);
  return (
    <div className='h-[70px] bg-black text-white z-50 flex item-center sticky top-0'>
        <div className='lg:px-14 sm:px-8 px-4 w-full flex justify-between items-center'>
            <Link to="/" className='flex items-center text-2xl font-semibold'>
                <img src={Logo} className='mr-2 text-3xl h-14' alt="" />
                <span className='font-mono'>CheckIt</span>
            </Link>
            <ul className={`flex md:items-center justify-center sm:gap-10 gap-4 sm:items-center  text-slate-800 sm:static absolute left-0 top-[70px] sm:shadow-none shadow-md ${
            navbarOpen ? "h-fit sm:pb-0 pb-5" : "h-0 overflow-hidden"
          }  transition-all duration-100 sm:h-fit sm:bg-none bg-black text-white sm:w-fit w-full sm:flex-row flex-col px-4 sm:px-0`}>
                <li className='font-[500] transition-all duration-150'>
                    <Link className={`${path === '/' ? 'text-white font-semibold' :'text-gray-200'}`} to="/"> Home
                    </Link>
                </li>
                 <li className='font-[500] transition-all duration-150'>
                    <Link className={`${path === '/products' ? 'text-white font-semibold' :'text-gray-200'}`} to="/products"> Products
                    </Link>
                </li>
                 <li className='font-[500] transition-all duration-150'>
                    <Link className={`${path === '/about' ? 'text-white font-semibold' :'text-gray-200'}`} to="/about"> About
                    </Link>
                </li>
                 <li className='font-[500] transition-all duration-150'>
                    <Link className={`${path === '/contact' ? 'text-white font-semibold' :'text-gray-200'}`} to="/contact"> Contact
                    </Link>
                </li>
                 <li className='font-[500] transition-all duration-150'>
                    <Link className={`${path === '/cart' ? 'text-white font-semibold' :'text-gray-200'}`} to="/cart"> 
                        <Badge 
                        showZero
                        badgeContent={cart?.length || 0}
                        overlap='circular'
                        anchorOrigin={{vertical: 'top' , horizontal:'right'}}
                        sx={{
                                '& .MuiBadge-badge': {
                                backgroundColor: '#ffff',  
                                color: 'black',              
                                }
                            }}
                        >
                                <BsHandbagFill size={25} />
                        </Badge>
                    </Link>
                </li>
                {
                   ( user && user.id) ? (
                <li className='font-[500] transition-all duration-150 cursor-pointer'>
                   <UserMenu />
                </li>
                    ) : (
                <li className='font-[500] transition-all duration-150'>
                    <Link className='flex items-center justify-center space-x-2 px-4 py-1.5 rounded bg-white text-black hover:bg-gray-500 hover:text-white duration-300 ease-in-out transform' to="/login">
                    <PiSignInDuotone size={25} />
                     Login
                    </Link>
                </li>
                    )
                }
               
            </ul>
            <button onClick={() => setNavbarOpen(!navbarOpen)} className='sm:hidden flex items-center sm:mt-0 mt-2'>
                        {navbarOpen ? (<RxCross2 className="text-white text-3xl" />) : <CiMenuFries className="text-white text-3xl" />}
            </button>
        </div>
    </div>
  )
}
