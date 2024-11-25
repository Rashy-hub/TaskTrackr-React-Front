const FooterHome = () => {
    return (
        <footer className="bg-gray-800 text-white py-12">
            <div className="container mx-auto px-6">
                {/* Logo et Slogan */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2">Stay Organized with TaskTrackr</h2>
                    <p className="text-lg">The best way to manage your tasks and boost productivity.</p>
                </div>

                {/* Liens de navigation */}
                <div className="flex justify-center mb-8">
                    <ul className="flex space-x-8">
                        <li>
                            <a href="/about" className="text-lg hover:text-yellow-400">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="/features" className="text-lg hover:text-yellow-400">
                                Features
                            </a>
                        </li>
                        <li>
                            <a href="/pricing" className="text-lg hover:text-yellow-400">
                                Pricing
                            </a>
                        </li>
                        <li>
                            <a href="/contact" className="text-lg hover:text-yellow-400">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Abonnement à la newsletter */}
                <div className="text-center mb-8">
                    <h3 className="text-xl font-semibold mb-2">Stay Updated!</h3>
                    <p className="text-md mb-4">Subscribe to our newsletter to get the latest updates and tips.</p>
                    <form className="flex justify-center">
                        <input type="email" placeholder="Your email address" className="px-4 py-2 rounded-l-md text-black" />
                        <button className="bg-yellow-500 text-white px-6 py-2 rounded-r-md hover:bg-yellow-400">Subscribe</button>
                    </form>
                </div>

                {/* Informations légales et réseaux sociaux */}
                <div className="flex justify-between items-center text-sm border-t border-gray-700 pt-6">
                    <p>&copy; 2024 TaskTrackr, All Rights Reserved.</p>
                    <div className="space-x-4">
                        <a href="https://facebook.com" className="text-white hover:text-yellow-400">
                            Facebook
                        </a>
                        <a href="https://twitter.com" className="text-white hover:text-yellow-400">
                            Twitter
                        </a>
                        <a href="https://instagram.com" className="text-white hover:text-yellow-400">
                            Instagram
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default FooterHome
