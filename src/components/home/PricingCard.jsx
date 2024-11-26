const PricingCard = () => {
    //AI generated :) ; no time its a MVP
    return (
        <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-[#202938] to-[#171717] text-white rounded-lg shadow-lg">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex items-center bg-white text-gray-800 p-4 rounded-md shadow-md">
                    <div className="w-[40px] h-[40px] mr-2">
                        <img src="/unlimited-user.svg" alt="" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">Unlimited Accounts</h3>
                        <p className="text-sm text-gray-600">We dont limit the number of accounts you can create.</p>
                    </div>
                </li>

                <li className="flex items-center bg-white text-gray-800 p-4 rounded-md shadow-md">
                    <div className="w-[40px] h-[40px] mr-2">
                        <img src="/api-access.svg" alt="" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">API Access</h3>
                        <p className="text-sm text-gray-600">Create anything you want with our robust API.</p>
                    </div>
                </li>

                <li className="flex items-center bg-white text-gray-800 p-4 rounded-md shadow-md">
                    <div className="w-[40px] h-[40px] mr-2">
                        <img src="/cloud.svg" alt="" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">Cloud Storage</h3>
                        <p className="text-sm text-gray-600">Store up to 50GB securely in the cloud.</p>
                    </div>
                </li>

                <li className="flex items-center bg-white text-gray-800 p-4 rounded-md shadow-md">
                    <div className="w-[40px] h-[40px] mr-2">
                        <img src="/client-support.svg" alt="" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">Client Support</h3>
                        <p className="text-sm text-gray-600">Call for assistance whenever you need it.</p>
                    </div>
                </li>

                <li className="flex items-center bg-white text-gray-800 p-4 rounded-md shadow-md">
                    <div className="w-[40px] h-[40px] mr-2">
                        <img src="/security-card.svg" alt="" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">Data Security</h3>
                        <p className="text-sm text-gray-600">Your data is protected with top-tier security.</p>
                    </div>
                </li>

                <li className="flex items-center bg-white text-gray-800 p-4 rounded-md shadow-md">
                    <div className="w-[40px] h-[40px] mr-2">
                        <img src="/online-pay.svg" alt="" />
                    </div>
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
