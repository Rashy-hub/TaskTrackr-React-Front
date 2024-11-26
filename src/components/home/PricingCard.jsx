const PricingCard = () => {
    //AI generated :) ; no time its a MVP
    return (
        <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-[#202938] to-purple-600 text-white rounded-lg shadow-lg">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex items-center bg-white text-gray-800 p-4 rounded-md shadow-md">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-blue-500 mr-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 11c.828 0 1.5-.672 1.5-1.5S12.828 8 12 8s-1.5.672-1.5 1.5S11.172 11 12 11zm0 0v6m0 0H9m3 0h3m-6 0a9 9 0 1118 0H6z"
                        />
                    </svg>
                    <div>
                        <h3 className="font-semibold text-lg">Unlimited Accounts</h3>
                        <p className="text-sm text-gray-600">We dont limit the number of accounts you can create.</p>
                    </div>
                </li>

                <li className="flex items-center bg-white text-gray-800 p-4 rounded-md shadow-md">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-purple-500 mr-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 16v2a2 2 0 002 2h4a2 2 0 002-2v-2M16 4a2 2 0 00-2-2H8a2 2 0 00-2 2v12m12-6H4m10 4v1m2-4v3m0 3v2"
                        />
                    </svg>
                    <div>
                        <h3 className="font-semibold text-lg">API Access</h3>
                        <p className="text-sm text-gray-600">Create anything you want with our robust API.</p>
                    </div>
                </li>

                <li className="flex items-center bg-white text-gray-800 p-4 rounded-md shadow-md">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-yellow-500 mr-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7l9-4 9 4M4 10h16v11H4V10zm1-2v13m14-13v13" />
                    </svg>
                    <div>
                        <h3 className="font-semibold text-lg">Cloud Storage</h3>
                        <p className="text-sm text-gray-600">Store up to 50GB securely in the cloud.</p>
                    </div>
                </li>

                <li className="flex items-center bg-white text-gray-800 p-4 rounded-md shadow-md">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-green-500 mr-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 5.88V19m0-5.12V5"
                        />
                    </svg>
                    <div>
                        <h3 className="font-semibold text-lg">Client Support</h3>
                        <p className="text-sm text-gray-600">Call for assistance whenever you need it.</p>
                    </div>
                </li>

                <li className="flex items-center bg-white text-gray-800 p-4 rounded-md shadow-md">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-red-500 mr-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4.75a7.25 7.25 0 100 14.5 7.25 7.25 0 000-14.5zM12 8v4l2 2"
                        />
                    </svg>
                    <div>
                        <h3 className="font-semibold text-lg">Data Security</h3>
                        <p className="text-sm text-gray-600">Your data is protected with top-tier security.</p>
                    </div>
                </li>

                <li className="flex items-center bg-white text-gray-800 p-4 rounded-md shadow-md">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-indigo-500 mr-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-3-3v6m-8 4v1a3 3 0 003 3h8a3 3 0 003-3v-1m-4-8h-4m4 0h.01"
                        />
                    </svg>
                    <div>
                        <h3 className="font-semibold text-lg">Easy Billing</h3>
                        <p className="text-sm text-gray-600">Transparent pricing with no hidden fees.</p>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default PricingCard
