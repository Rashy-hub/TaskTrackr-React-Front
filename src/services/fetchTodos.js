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
                    throw new Error(
                        `HTTP error: ${response.status} ${response.statusText}`
                    )
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
                baseURL: `${baseUrl}/:id`, //with placeholder to build correctly the new url
                params: { id },
            })

            let response = await fetch(buildedURL)

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Task does not exist (404)')
                } else if (response.status === 500) {
                    throw new Error('Server error (500)')
                } else {
                    throw new Error(
                        `HTTP error: ${response.status} ${response.statusText}`
                    )
                }
            }

            let data = await response.json()
            return data
        } catch (error) {
            throw new Error('Something went wrong ' + error.message)
        }
    },
    /*    putTodo: async ({ id }) => {},
    postTodo: async ({ data }) => {},
    deleteTodo: async ({ id }) => {}, */
}

export default fetchTodos
