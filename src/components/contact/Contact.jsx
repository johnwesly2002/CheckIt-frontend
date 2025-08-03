import React from 'react'
import { FaPhone, FaVoicemail } from 'react-icons/fa'
import { IoLocation } from "react-icons/io5";
import contact from '../../assets/contact.svg';
export default function Contact() {
  return (
		<div
			className="flex flex-col items-center justify-center min-h-screen py-12 bg-cover bg-center"
			style={{ backgroundImage: `url('${contact}')` }}
		>
			<div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
				<h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
				<p className="text-gray-600 text-center mb-4">
					We would love to here from you! Please fill out the form below or
					contact us
				</p>
				<form className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Name
						</label>
						<input
							type="text"
							required
							className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Email
						</label>
						<input
							type="email"
							required
							className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Message
						</label>
						<textarea
							rows="4"
							required
							className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
						/>
					</div>
					<button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-700">
						Send Message
					</button>
				</form>
				<div className="mt-8 text-center">
					<h2 className="text-lg font-semibold">Contact Information</h2>
					<div className="flex flex-col justify-center items-center text-gray-500 space-y-2 mt-4">
						<div className="flex text-center gap-1">
							<FaPhone size={20} />
							+91********09
						</div>
					<div className="flex text-center gap-1">
						<FaVoicemail size={20} />
						ujohnwesly8@gmail.com
					</div>

					<div className="flex text-center">
						<IoLocation size={20} />
						Andhra Pradhesh, India
					</div>
             </div>
				</div>
			</div>
		</div>
	);
}
