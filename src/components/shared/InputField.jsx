const InputField = ({
    label,
    id,
    type,
    errors,
    register,
    required,
    message,
    className,
    min,
    value,
    placeholder,
}) => {
    return(
        <div className="flex flex-col gap-1 w-full">
            <label htmlFor="id" className={`${className ? className : ''} font-semibold text-sm text-black`}>{label}</label>
            <input type={type} id={id} placeholder={placeholder} className={`${className ? className : ''} px-2 py-2 border outline-none bg-transparent text-black rounded
            ${errors[id]?.message ?  'border-red-500' : 'border-gray-300'}
            `}
            {...register(id, {
                required: {value: required, message},
                minLength: min ? {value: min, message: `Minimum ${min} Characters is required`} : null,
                pattern: type === 'email' ? {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invaild email'
                } : type === 'url' ?  {
                    value: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                    message: 'Please enter a vaild url'
                } : null
            })} />
            {errors[id]?.message && (
                <p className="text-sm font-semibold text-red-500 mt-0.5">
                    {errors[id]?.message}
                </p>
            )}
        </div>
    );
}
export default InputField;