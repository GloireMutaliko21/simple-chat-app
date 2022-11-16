const Button = ({ icon, label, style, onClick }) => {
    return (
        <button
            type='buttom'
            className={`${style} flex items-center rounded-md text-center`}
            onClick={onClick}
        >
            {label}
            {icon}
        </button>
    )
}

export default Button;