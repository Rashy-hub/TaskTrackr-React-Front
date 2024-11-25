import { useEffect, useState } from 'react'

const Features = () => {
    const [features, setFeatures] = useState([])

    useEffect(() => {
        // Fetch the JSON file from the public folder
        fetch('/features.json')
            .then((response) => response.json())
            .then((data) => setFeatures(data))
            .catch((error) => console.error('Error loading JSON file:', error))
    }, [])

    useEffect(() => {
        console.log('Features changed:', JSON.stringify(features))
    }, [features])

    return (
        <section className="w-full">
            {features.length > 0 ? (
                features.map((feature, index) => (
                    <div key={index} className="grid grid-cols-2 w-[80%] shadow-lg rounded-lg mt-12 mx-auto">
                        <div className="flex flex-col items-center justify-start">
                            <h2 className="text-4xl font-semibold mb-6">{feature.title}</h2>
                            <ul className="list-disc pl-6 mb-4">
                                {feature.description.map((point, idx) => (
                                    <li key={idx} className="text-4xl font-special text-neutral-100">
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
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
