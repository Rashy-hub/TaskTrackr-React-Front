import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const TopicCard = ({ topic }) => {
    const navigate = useNavigate()

    // Map of category to button styles
    const categoryStyles = {
        'SOCIAL DUTIES': 'bg-pink-500',
        INTERPERSONAL: 'bg-blue-500',
        LEARNING: 'bg-green-500',
        REVIEW: 'bg-red-500',
        CHORES: 'bg-yellow-500',
        SPORTS: 'bg-purple-500',
        WORK: 'bg-orange-500',
    }

    const buttonClass = `${categoryStyles[topic.category]} text-white`
    const handleTopicDetails = () => {
        // <Route path="/app/topics/:topicId" element={<TodoPage />} />
        navigate(`/app/topics/${topic._id}`) // Navigate to the topic details page with the topic ID
    }
    return (
        <div className={`isotope-item p-4 m-2 w-[320px] h-[320px] rounded-lg shadow-md ${buttonClass} animate-fadeIn`}>
            <h3 className="text-white text-lg font-semibold">{topic.title}</h3>
            <p className="text-white mt-2">{topic.description}</p>

            <button className={`absolute bottom-0 right-0 m-2 px-4 py-2 rounded ${buttonClass}`} onClick={handleTopicDetails}>
                Details
            </button>
        </div>
    )
}

TopicCard.propTypes = {
    topic: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
    }).isRequired,
}

export default TopicCard
