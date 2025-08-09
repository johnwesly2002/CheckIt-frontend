
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../../shared/InputField'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress, addaddressError, addaddressloading, fetchAddresses } from '../../../store/reducers/addressSlice';
export default function AddAddress({address, setIsOpen}) {
  const dispatch = useDispatch();
  const{handleSubmit, register, reset,setValue, formState:{errors}} = useForm({mode: 'onTouched'});
  const loading = useSelector(addaddressloading);
  const error = useSelector(addaddressError);
  const saveHandler = async(data) => {
    const result = await dispatch(addAddress({data: data, addressId: address?.addressId}));
    if (addAddress.fulfilled.match(result)) {
        reset();
        setIsOpen((prev) => !prev);
        dispatch(fetchAddresses());
    }
  }

  useEffect(() => {
    if(address?.addressId) {
      setValue("buildingName", address?.buildingName);
      setValue("city", address?.city);
      setValue("street", address?.street);
      setValue("state", address?.state);
      setValue("pincode", address?.pincode);
      setValue("country", address?.country);
    }
  },[])


  return (
    <>
      <form onSubmit={handleSubmit(saveHandler)}>
            <div className='flex flex-col items-start justify-start space-y-4'>
                <span className='text-black text-2xl font-bold'>{!address?.addressId ? 'Add Address' : 'Update Address'}</span>
            </div>
            <hr className='mt-2 mb-5 text-black' />
            <div className='flex flex-col gap-3'>
                <InputField
                label="Building Name"
                required
                id="buildingName"
                type="text"
                message={"*Building name is required"}
                placeholder="Enter your Building name"
                register={register} 
                errors={errors}
                />
                <InputField
                label="City"
                required
                id="city"
                type="text"
                message={"*City is required"}
                placeholder="Enter your City"
                register={register} 
                errors={errors}
                />
                <InputField
                label="State"
                required
                id="state"
                type="text"
                message={"*State is required"}
                placeholder="Enter your State"
                register={register} 
                errors={errors}
                />
                <InputField
                label="Pincode"
                required
                id="pincode"
                type="text"
                message={"*Pincode is required"}
                placeholder="Enter your Pincode"
                register={register} 
                errors={errors}
                />
                <InputField
                label="Street"
                required
                id="street"
                type="text"
                message={"*Street is required"}
                placeholder="Enter your Street"
                register={register} 
                errors={errors}
                />
                <InputField
                label="Country"
                required
                id="country"
                type="text"
                message={"*Country is required"}
                placeholder="Enter your Country"
                register={register} 
                errors={errors}
                />
            </div>
            <div className='flex justify-start items-center gap-4'>
                <button disabled={loading} type="submit" className=' flex gap-2 items-center justify-center font-semibold bg-black my-3 text-white hover:text-white/80 transition-colors duration-100 rounded-sm  py-2 w-36'>
            {loading ? (<>Saving...</>) : 'Save' }</button>
            <button onClick={() => setIsOpen((prev) => !prev)} className='bg-gray-200 cursor-pointer text-black py-2 px-3 rounded-sm items-center transition-colors duration-300 w-36 flex gap-2 justify-center'>
            Cancel</button>
            </div>
            
        </form>
    </>
  )
}
