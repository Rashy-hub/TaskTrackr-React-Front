import { useNavigate } from 'react-router-dom'

const NavBar = () => {
    const navigate = useNavigate()

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-transparent text-white">
            <div className="flex items-center space-x-6">
                <a href="#features" className="hover:text-gray-400">
                    Features
                </a>
                <a href="#pricing" className="hover:text-gray-400">
                    Pricing
                </a>
                <span className="text-gray-500">|</span>

                <button
                    onClick={() => navigate('/login')}
                    className="hover:text-gray-400 bg-transparent border-none cursor-pointer"
                    title="Sign In"
                    aria-label="Sign In"
                >
                    Sign In
                </button>
                <button
                    onClick={() => navigate('/signup')}
                    className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
                    title="Sign Up"
                    aria-label="Sign Up"
                >
                    Sign Up
                </button>
            </div>
        </nav>
    )
}

export default NavBar
