import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const SignButton = ({ name, variant }) => {
    const navigate = useNavigate()
    const { logout, isLoading } = useAuth()
    const baseStyles =
        'px-6 py-2 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ease-in-out transform'

    const variantStyles = {
        login: 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg focus:ring-blue-400 hover:-translate-y-1',
        register:
            'bg-white text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-white focus:ring-blue-500 hover:shadow-md hover:-translate-y-1',
        logout: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400 hover:-translate-y-1', // Style for  logout
    }

    const handleClick = async () => {
        if (variant === 'login') {
            navigate('/app/login')
        } else if (variant === 'register') {
            navigate('/app/register')
        } else if (variant === 'logout') {
            try {
                await logout()
                navigate('/app/login')
            } catch (error) {
                console.error('Logout failed:', error)
            }
        }
    }

    return (
        <button className={classNames(baseStyles, variantStyles[variant])} onClick={handleClick} disabled={isLoading}>
            name
        </button>
    )
}

SignButton.propTypes = {
    name: PropTypes.string.isRequired,
    variant: PropTypes.oneOf(['login', 'register', 'logout']),
}

export default SignButton
