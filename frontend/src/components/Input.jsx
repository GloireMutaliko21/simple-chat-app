import React from 'react'

const Input = (
    {
        style,
        placeholder,
        disabled, label,
        value, onChange,
        type, name,
        icon, iconMask,
        reference
    }
) => {
    return (
        <div>
            <label className='font-bold text-sm'>{label}</label>
            <div className='bg-gray-200 flex justify-between items-center relative my-2'>
                <input
                    ref={reference}
                    className={`${style} text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block appearance-none w-full`}
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    name={name}
                    disabled={disabled}
                >
                </input>
                <span
                    className='absolute right-3 hover:cursor-pointer text-lg text-teal-900'
                // onClick={handleChangeIcon}
                >
                    {/* {!boolingState.showPassword ? icon : iconMask} */}
                </span>
            </div>
        </div>
    );
}

export default Input;