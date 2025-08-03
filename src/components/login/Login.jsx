import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import InputField from '../../components/shared/InputField.jsx';
import Logo from '../../assets/CheckIt_Logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser, getAuthError, getAuthLoading, getCurrentUser } from '../../store/reducers/authSlice.js';
export default function Login() {
    const navigate = useNavigate();
    const loading = useSelector(getAuthLoading);
    const error = useSelector(getAuthError);
    const dispatch = useDispatch();
    const user = useSelector(getCurrentUser);
    useEffect(() => {
        if(user) {
            navigate('/products');
        }
    },[user])


    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        mode:"onTouched"
    })
    const loginHandler = async(data) => {
        dispatch(authenticateUser(data));

    }
  return (
    <div className='min-h-[calc(100vh-64px)] flex justify-center items-center'>
        <form onSubmit={handleSubmit(loginHandler)} className='sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded'>
            <div className='flex flex-col items-start justify-start space-y-4'>
                <img src={Logo} alt="CheckIt Logo" className='w-15 m-0 p-0' />
                <span className='text-black text-2xl font-bold'>Login</span>
            </div>
            <hr className='mt-2 mb-5 text-black' />
            <div className='flex flex-col gap-3'>
                <InputField
                label="Username"
                required
                id="username"
                type="text"
                message={"*Username is required"}
                placeholder="Enter your username"
                register={register} 
                errors={errors}
                />
                <InputField
                label="Password"
                required
                id="password"
                type="password"
                message={"*Password is required"}
                placeholder="Enter your password"
                register={register} 
                errors={errors}
                />
            </div>
            <button disabled={loading} type="submit" className=' flex gap-2 items-center justify-center font-semibold bg-black my-3 text-white hover:text-white/80 transition-colors duration-100 rounded-sm  py-2 w-full'>
            {loading ? (<>Loading...</>) : 'Login' }</button>

            <p className='text-center text-sm text-black/80 mt-5'>Don't have an account?
                <Link className='font-semibold underline hover:text-blue-600' to="/register"><span> Signup</span></Link>
            </p>
            
        </form>
    </div>
  )
}
