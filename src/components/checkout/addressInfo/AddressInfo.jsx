
import React, { useEffect, useState } from 'react'
import SkeletonLoader from '../../shared/Skeleton';
import address from '../../../assets/address.svg';
import { BsHouseAddFill } from "react-icons/bs";
import Address from './Address';
import AddAddress from './AddAddress';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserAddress, fetchaddressError, fetchAddresses, fetchaddressloading, getAddresses } from '../../../store/reducers/addressSlice';
import AddressList from './AddressList.jsx';
import { DeleteAddress } from './DeleteAddress.jsx';
import ErrorPage from '../ErrorPage.jsx';
export default function AddressInfo() {
    const[openAddressModal, setOpenAddressModal] = useState(false);
    const[openDeleteModal, setOpenDeleteModal] = useState(false);

    const[selectedAddress, setSelectedAddress] = useState(null);
    const addresses = useSelector(getAddresses);
    const isLoading = useSelector(fetchaddressloading);
    const error = useSelector(fetchaddressError);
    const dispatch = useDispatch();
    const addNewAddressHandler = () => {
        setSelectedAddress(null);
        setOpenAddressModal(true);
    }
    const deleteAddressHandler = async() => {
        const result = await dispatch(deleteUserAddress(selectedAddress?.addressId));
        if(deleteUserAddress.fulfilled.match(result)) {
            setOpenDeleteModal(false);
            dispatch(fetchAddresses());
        }
    }

    useEffect(() => {
        dispatch(fetchAddresses());
    },[]);

  return (
    <div className='pt-4'>
        {addresses.length == 0 ? (
            <ErrorPage
            img={address}
            message={"Please add your address to proceed with purchase"}
            isButton={true}
            buttonHandler={addNewAddressHandler}
            buttonTitle={"Add Address"}
            ButtonIcon={BsHouseAddFill}
            />
        ) : (
            <div className='relative p-2 rounded-lg max-w-2xl mx-auto'>
                <h1 className='text-black font-semibold text-2xl'>Select Address</h1>
                {isLoading ? (<SkeletonLoader />) : (<div className='flex flex-col gap-2'>
                       <AddressList addresses={addresses} setOpenDeleteModal={setOpenDeleteModal} setSelectedAddress={setSelectedAddress} setOpenAddressModal={setOpenAddressModal} />
                </div>)}
                {addresses.length > 0 && (
                    <button onClick={addNewAddressHandler} className={`bg-gray-200 cursor-pointer text-black py-2 px-3 rounded-md items-center transition-colors duration-300 w-36 flex gap-2 justify-center`}>
                    <BsHouseAddFill size={20} />
                    Add More
                    </button>
                )}
            </div>
        )}
        <Address open={openAddressModal} setIsOpen={setOpenAddressModal}>
            <AddAddress setIsOpen={setOpenAddressModal} address={selectedAddress} />
        </Address>

        <DeleteAddress open={openDeleteModal} setOpen={setOpenDeleteModal}  title={'Delete Address'} onDeleteHandler={deleteAddressHandler} />
    </div>
  )
}
