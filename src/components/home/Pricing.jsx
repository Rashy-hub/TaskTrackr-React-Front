import CTA from './CTA'
import PricingCard from './PricingCard'

const Pricing = () => {
    return (
        <section id="pricing" className="w-full p-24 flex flex-col justify-start items-center gap-4 ">
            <div className="flex gap-2 items-center">
                <img src="/home.svg" alt="" />

                <h2 className="text-4xl font-special">GET TASKTRACRK NOW</h2>
            </div>
            <h3>No ads . No trials . No commitments</h3>
            <PricingCard />
            <h3>* All our features are available to all our users durging the beta phase</h3>
            <div className="flex items-end space-x-2">
                <span className="text-2xl font-bold text-gray-100">$</span>
                <span className="text-5xl font-extrabold text-gray-100">4.99</span>
                <span className="text-sm font-medium text-gray-500">/month</span>
            </div>

            <CTA />
        </section>
    )
}

export default Pricing
