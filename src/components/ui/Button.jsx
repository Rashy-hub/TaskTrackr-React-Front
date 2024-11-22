import PropTypes from 'prop-types'

const Button = ({ onClick, icon }) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center justify-center bg-yellow-500 text-black w-12 h-12 m-0 rounded-full hover:bg-yellow-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
        >
            {icon && <span className="text-xl">{icon}</span>}
        </button>
    )
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.node,
}

export default Button
