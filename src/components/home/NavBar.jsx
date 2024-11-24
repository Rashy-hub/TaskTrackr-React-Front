const NavBar = () => {
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
                <a href="#sign-in" className="hover:text-gray-400">
                    Sign In
                </a>
                <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500">Sign Up</button>
            </div>
        </nav>
    )
}

export default NavBar
