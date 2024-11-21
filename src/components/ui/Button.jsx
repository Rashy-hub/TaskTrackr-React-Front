import PropTypes from 'prop-types'

const Button = ({ onClick, children, icon }) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
        >
            {icon && <span className="mr-2">{icon}</span>}
            {children}
        </button>
    )
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    icon: PropTypes.node,
}

export default Button
