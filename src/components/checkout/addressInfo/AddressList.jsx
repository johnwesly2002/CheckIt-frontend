import React from 'react'
import { RiHomeSmileFill } from "react-icons/ri";
import { TbShoppingBagEdit } from "react-icons/tb";
import { PiCheckCircleFill } from "react-icons/pi";
import { AiOutlineDelete  } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { selectUserAddress } from '../../../store/reducers/addressSlice';
export default function AddressList({addresses, setSelectedAddress, setOpenAddressModal, setOpenDeleteModal}) {
  const selectedUserAddress = useSelector(state => state.address.selectedAddress);
  const dispatch = useDispatch();
  const handleAddressSelection = (address) => {
        dispatch(selectUserAddress(address));
  } 
  const onEditButtonHandler = (address) => {
        setSelectedAddress(address);
        setOpenAddressModal(true);
  }

  const onDeleteButtonHandler = (address) => {
    console.log("delete clicked")
    setSelectedAddress(address);
    setOpenDeleteModal(true);
  }

  return (
    <div>
        {addresses.map((address, index) => (
            <div key={address.addressId} onClick={() => handleAddressSelection(address)}
            className={`p-4 border rounded-md cursor-pointer m-2 relative ${selectedUserAddress?.addressId === address.addressId ? 'bg-blue-200/70' : 'bg-white'} `}>
                <div className='flex items-start'> 
                    <div className='space-y-1'>
                        <div className='flex items-center gap-2'>
                            <RiHomeSmileFill className='text-gray-600' size={25} />
                            <p className='font-semibold'>{address.buildingName}</p>
                            {selectedUserAddress?.addressId === address.addressId && (
                               <PiCheckCircleFill className='text-blue-600/80' size={25} />
                            )}
                        </div>
                         <div className='flex items-center gap-2'>
                            <p className='font-regular'>{address.street}</p>
                        </div>
                         <div className='flex items-center gap-2'>
                            <p className='font-regular'>{address.city} - {address.pincode}</p>
                        </div>
                         <div className='flex items-center gap-2'>
                            <p className='font-regular'>{address.state}</p>
                        </div>
                         <div className='flex items-center gap-2'>
                            <p className='font-regular'>{address.country}</p>
                        </div>
                    </div>
                </div>
                <div className='flex gap-2 absolute top-4 right-2'>
                        <button className='cursor-pointer' onClick={() => onEditButtonHandler(address)}>
                            <TbShoppingBagEdit size={25} />
                        </button>
                        <button className='cursor-pointer' onClick={() => onDeleteButtonHandler(address)}>
                            <AiOutlineDelete size={25} />
                        </button>
                </div>
            </div>
        ))}
    </div>
  )
}
