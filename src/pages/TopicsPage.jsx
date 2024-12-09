import Isotope from 'isotope-layout'
import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useNavigate } from 'react-router-dom'
import TopicCard from '../components/topics/TopicCard'
import fetchTopics from '../services/fetchTopics'
import { useQuery } from '@tanstack/react-query'

const TopicsPage = () => {
    const {
        data: responseData,
        error,
        isLoading,
    } = useQuery({
        queryFn: fetchTopics.getTopics,
        queryKey: ['topics'],
    })

    const topics = responseData?.data?.topics || []
    const containerRef = useRef(null)
    const { darkMode } = useTheme()
    const navigate = useNavigate()

    useEffect(() => {
        if (!topics.length || !containerRef.current) return

        // Initialize Isotope
        const iso = new Isotope(containerRef.current, {
            itemSelector: '.isotope-item',
            layoutMode: 'fitRows',
            transitionDuration: '0.3s',
        })

        // Filter change handler
        const handleFilterChange = (e) => {
            iso.arrange({ filter: e.target.value })
        }

        // Attach event listener
        const filterSelect = document.querySelector('.filter-select')
        filterSelect.addEventListener('change', handleFilterChange)

        // Cleanup
        return () => {
            filterSelect.removeEventListener('change', handleFilterChange)
            iso.destroy()
        }
    }, [topics])

    const handleAddTopic = () => navigate('/app/topics/create')

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>An error occurred: {error.message}</div>

    return (
        <div className={`body-bg`} data-theme={darkMode ? 'dark' : 'light'}>
            <div className="flex justify-center mt-6 h-fit mb-10">
                <button className="px-4 py-2 bg-gray-800 text-white rounded" onClick={handleAddTopic}>
                    Create New Topic
                </button>
            </div>

            {topics.length === 0 ? (
                <div className="text-center text-gray-600">
                    <p>No topics found.</p>
                </div>
            ) : (
                <>
                    {/* Filter dropdown */}
                    <div className="flex justify-center mb-6">
                        <select className="filter-select px-4 py-2 border rounded text-neutral-900">
                            <option value="*">ALL</option>
                            <option value=".bg-blue-500">INTERPERSONAL</option>
                            <option value=".bg-green-500">LEARNING</option>
                            <option value=".bg-red-500">REVIEW</option>
                            <option value=".bg-yellow-500">CHORES</option>
                            <option value=".bg-purple-500">SPORTS</option>
                            <option value=".bg-orange-500">WORK</option>
                            <option value=".bg-pink-500">SOCIAL DUTIES</option>
                        </select>
                    </div>

                    {/* Topics container */}
                    <div ref={containerRef} className="isotope flex flex-wrap justify-center items-center gap-6 p-4">
                        {topics.map((topic) => (
                            <TopicCard key={topic._id} topic={topic} />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default TopicsPage
