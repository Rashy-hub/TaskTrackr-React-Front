import urlBuilder from '../utils/urlBuilder'

const baseUrl = import.meta.env.VITE_BASE_URL

const fetchAuth = {
    login: async (credentials) => {
        try {
            console.log('Fetch Auth Credentials received ' + JSON.stringify(credentials))
            const buildedURL = urlBuilder({
                baseURL: baseUrl,
                endpoint: '/auth/login',
            })

            const response = await fetch(buildedURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
                credentials: 'include',
            })

            if (!response.ok) {
                const errorText = await response.text()
                if (response.status === 404) {
                    throw new Error('Endpoint not found (404): ' + errorText)
                } else if (response.status === 500) {
                    throw new Error('Internal Server Error (500): ' + errorText)
                } else {
                    throw new Error(`${errorText}`)
                }
            }

            const data = await response.json()
            return data
        } catch (error) {
            throw new Error(error.message)
        }
    },

    register: async (userData) => {
        try {
            console.log('TRYING TO REGISTER')
            const buildedURL = urlBuilder({
                baseURL: baseUrl,
                endpoint: '/auth/register',
            })

            const response = await fetch(buildedURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
                credentials: 'include',
            })

            if (!response.ok) {
                const errorText = await response.text()
                if (response.status === 404) {
                    throw new Error('User not found (404): ' + errorText)
                } else if (response.status === 500) {
                    throw new Error('Server error (500): ' + errorText)
                } else {
                    throw new Error(`HTTP error: ${response.status} ${response.statusText} - ${errorText}`)
                }
            }

            const data = await response.json()
            return data
        } catch (error) {
            throw new Error('Something went wrong during registration: ' + error.message)
        }
    },

    refresh: async () => {
        try {
            const buildedURL = urlBuilder({
                baseURL: baseUrl,
                endpoint: '/auth/refresh',
            })

            const response = await fetch(buildedURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
                credentials: 'include',
            })

            if (!response.ok) {
                const errorText = await response.text()
                throw new Error(`HTTP error: ${response.status} ${response.statusText} - ${errorText}`)
            }

            const data = await response.json()
            return data
        } catch (error) {
            throw new Error('Could not refresh token: ' + error.message)
        }
    },

    logout: async () => {
        try {
            console.log('sending request to delete the cookie token')
            const buildedURL = urlBuilder({
                baseURL: baseUrl,
                endpoint: '/auth/logout',
            })

            const response = await fetch(buildedURL, {
                method: 'POST',
                credentials: 'include',
            })

            if (!response.ok) {
                const errorText = await response.text()
                throw new Error('Failed to logout: ' + errorText)
            }

            const data = await response.json()
            return data
        } catch (error) {
            throw new Error('Could not logout: ' + error.message)
        }
    },
}

export default fetchAuth
