import { useEffect, useState } from 'react'

const Features = () => {
    const [features, setFeatures] = useState([])

    useEffect(() => {
        fetch('/features.json')
            .then((response) => response.json())
            .then((data) => setFeatures(data))
            .catch((error) => console.error('Error loading JSON file:', error))
    }, [])

    return (
        <section className="w-full mt-4">
            {features.length > 0 ? (
                features.map((feature, index) => (
                    <div
                        key={index}
                        className={`grid grid-cols-2 w-[80%] mt-12 mx-auto place-content-center place-items-center ${
                            index % 2 === 1 ? 'flex-row-reverse' : ''
                        }`}
                    >
                        {/* Text Section */}
                        <div className="flex flex-col items-center justify-start">
                            <h2 className="text-4xl font-semibold font-special mb-6">{feature.title}</h2>
                            <ul className="list-disc pl-6 mb-4">
                                {feature.description.map((point, idx) => (
                                    <li key={idx} className="text-2xl font-special text-neutral-100">
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Image Section */}
                        <div className="w-[300px] h-[300px] place-self-center">
                            <img src={feature.image} alt={feature.title} className="w-full h-auto" />
                        </div>
                    </div>
                ))
            ) : (
                <p>Loading features...</p>
            )}
        </section>
    )
}

export default Features
