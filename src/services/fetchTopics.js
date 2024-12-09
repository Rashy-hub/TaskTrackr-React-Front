import urlBuilder from '../utils/urlBuilder'

const baseUrl = import.meta.env.VITE_BASE_URL

const fetchTopics = {
    getTopics: async () => {
        try {
            const buildedURL = urlBuilder({
                baseURL: baseUrl,
                endpoint: '/topic',
            })
            const token = sessionStorage.getItem('authToken')
            const response = await fetch(buildedURL, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Topics not found (404)')
                } else if (response.status === 500) {
                    throw new Error('Server error (500)')
                } else {
                    throw new Error(`HTTP error: ${response.status} ${response.statusText}`)
                }
            }

            const data = await response.json()
            return data
        } catch (error) {
            throw new Error('Could not fetch topics: ' + error.message)
        }
    },

    getTopic: async (id) => {
        try {
            const buildedURL = urlBuilder({
                baseURL: baseUrl,
                endpoint: '/topic/:id',
                params: { id },
            })
            const token = sessionStorage.getItem('authToken')
            const response = await fetch(buildedURL, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Topic not found (404)')
                } else if (response.status === 500) {
                    throw new Error('Server error (500)')
                } else {
                    throw new Error(`HTTP error: ${response.status} ${response.statusText}`)
                }
            }

            const data = await response.json()
            return data
        } catch (error) {
            throw new Error('Could not fetch topic: ' + error.message)
        }
    },

    postTopic: async (data) => {
        try {
            const buildedURL = urlBuilder({
                baseURL: baseUrl,
                endpoint: '/topic',
            })
            const token = sessionStorage.getItem('authToken')
            const response = await fetch(buildedURL, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error('Invalid topic data (400)')
                } else if (response.status === 500) {
                    throw new Error('Server error (500)')
                } else {
                    throw new Error(`HTTP error: ${response.status} ${response.statusText}`)
                }
            }

            const createdData = await response.json()
            return createdData
        } catch (error) {
            throw new Error('Could not create topic: ' + error.message)
        }
    },

    putTopic: async (data) => {
        try {
            const buildedURL = urlBuilder({
                baseURL: baseUrl,
                endpoint: '/topic/:id',
                params: { id: data._id },
            })
            const token = sessionStorage.getItem('authToken')
            const response = await fetch(buildedURL, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error('Invalid topic data (400)')
                } else if (response.status === 404) {
                    throw new Error('Topic not found (404)')
                } else if (response.status === 500) {
                    throw new Error('Server error (500)')
                } else {
                    throw new Error(`HTTP error: ${response.status} ${response.statusText}`)
                }
            }

            const updatedData = await response.json()
            return updatedData
        } catch (error) {
            throw new Error('Could not update topic: ' + error.message)
        }
    },

    deleteTopic: async (id) => {
        try {
            const buildedURL = urlBuilder({
                baseURL: baseUrl,
                endpoint: '/topic/:id',
                params: { id },
            })
            const token = sessionStorage.getItem('authToken')
            const response = await fetch(buildedURL, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Topic not found (404)')
                } else if (response.status === 500) {
                    throw new Error('Server error (500)')
                } else {
                    throw new Error(`HTTP error: ${response.status} ${response.statusText}`)
                }
            }

            return { success: true, message: 'Topic successfully deleted' }
        } catch (error) {
            throw new Error('Could not delete topic: ' + error.message)
        }
    },
}

export default fetchTopics
