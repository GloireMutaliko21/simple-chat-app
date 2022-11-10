import React from 'react'

const Button = ({ icon, label, style, onClick }) => {
    return (
        <button
            type='buttom'
            className={`${style} flex items-center rounded-md text-center`}
            onClick={onClick}
        >
            {icon}
            {label}
        </button>
    )

}

export default Button