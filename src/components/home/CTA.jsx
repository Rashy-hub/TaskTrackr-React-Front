import { useNavigate } from 'react-router-dom'

const CTA = () => {
    const navigation = useNavigate()
    return (
        <button
            className="px-6 py-3 bg-amber-700 text-white font-semibold rounded-lg hover:bg-amber-600 transition duration-300"
            onClick={() => navigation('/app/register')}
        >
            Try it now!
        </button>
    )
}

export default CTA
