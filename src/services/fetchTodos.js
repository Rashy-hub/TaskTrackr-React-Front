import urlBuilder from '../utils/urlBuilder'

const baseUrl = import.meta.env.VITE_BASE_URL

const fetchTodos = {
    getTodos: async () => {
        try {
            const buildedURL = urlBuilder({
                baseURL: baseUrl,
                endpoint: '/todo',
            })

            let response = await fetch(buildedURL, { credentials: 'include' })

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Task list Not Found (404)')
                } else if (response.status === 500) {
                    throw new Error('Server error (500)')
                } else {
                    throw new Error(`HTTP error: ${response.status} ${response.statusText}`)
                }
            }

            let data = await response.json()
            return data
        } catch (error) {
            throw new Error('Could not get Task list ' + error.message)
        }
    },

    getTodo: async ({ id }) => {
        try {
            const buildedURL = urlBuilder({
                baseURL: `${baseUrl}/:id`,
                params: { id },
            })

            let response = await fetch(buildedURL)

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Task does not exist (404)')
                } else if (response.status === 500) {
                    throw new Error('Server error (500)')
                } else {
                    throw new Error(`HTTP error: ${response.status} ${response.statusText}`)
                }
            }

            let data = await response.json()
            return data
        } catch (error) {
            throw new Error('Something went wrong ' + error.message)
        }
    },
    postTodo: async (data) => {
        console.log('POSTINNG TODO ' + JSON.stringify(data.text))
        try {
            const buildedURL = urlBuilder({
                baseURL: baseUrl,
                endpoint: '/todo',
            })

            console.log('POSTING DATA NOW')
            let response = await fetch(buildedURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include',
            })

            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error('Invalid data (400)')
                } else if (response.status === 500) {
                    throw new Error('Server error (500)')
                } else {
                    throw new Error(`HTTP error: ${response.status} ${response.statusText}`)
                }
            }

            let createdData = await response.json()
            return createdData
        } catch (error) {
            throw new Error('Could not create Task ' + error.message)
        }
    },
    putTodo: async (data) => {
        try {
            console.log('Params:', data._id)

            const buildedURL = urlBuilder({
                baseURL: baseUrl,
                endpoint: '/todo/:id', // Use :id in the endpoint
                params: { id: data._id }, // Pass id to replace :id
            })
            console.log('PutTODO : buildedURL = ' + buildedURL + ' ' + 'body is : ' + JSON.stringify({ text: data.text }))

            let response = await fetch(buildedURL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: data.text }),
                credentials: 'include',
            })

            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error('Invalid data (400)')
                } else if (response.status === 404) {
                    throw new Error('Task not found (404)')
                } else if (response.status === 500) {
                    throw new Error('Server error (500)')
                } else {
                    throw new Error(`HTTP error: ${response.status} ${response.statusText}`)
                }
            }

            let updatedData = await response.json()
            return updatedData
        } catch (error) {
            throw new Error('Could not update Task ' + error.message)
        }
    },

    deleteTodo: async (id) => {
        try {
            console.log(id)
            const buildedURL = urlBuilder({
                baseURL: baseUrl,
                endpoint: '/todo/:id',
                params: { id: id },
            })

            let response = await fetch(buildedURL, {
                method: 'DELETE',
                credentials: 'include',
            })

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Task not found (404)')
                } else if (response.status === 500) {
                    throw new Error('Server error (500)')
                } else {
                    throw new Error(`HTTP error: ${response.status} ${response.statusText}`)
                }
            }

            return { success: true, message: 'Task successfully deleted' }
        } catch (error) {
            throw new Error('Could not delete Task ' + error.message)
        }
    },
}

export default fetchTodos
