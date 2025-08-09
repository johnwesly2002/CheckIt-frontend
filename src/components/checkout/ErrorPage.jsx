import React from "react";

export default function ErrorPage({img, message, isButton, buttonHandler, buttonTitle, ButtonIcon}) {
	return (
		<div className="p-2 rounded-lg max-w-2xl mx-auto flex flex-col items-center justify-center">
			<img
				src={img}
				className="lg:h-80 md:h-60 h-45"
				alt="address not found"
			/>
			<p className="mb-4 text-black text-center">
				{message}
			</p>
			{isButton && (
                <button
				onClick={buttonHandler}
				className={`bg-gray-200 cursor-pointer text-black py-2 px-3 rounded-lg items-center transition-colors duration-300 w-36 flex gap-2 justify-center`}
			>   
                {ButtonIcon && <ButtonIcon size={20} />}
				{buttonTitle}
			</button>
            )}
		</div>
	);
}
