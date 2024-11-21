import PropTypes from 'prop-types'
import { createContext, useContext, useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import fetchAuth from '../services/fetchAuth'
import fetchTodos from '../services/fetchTodos'

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [authUser, setAuthUser] = useState(null)

    // Mutation de login
    const {
        mutate: login,
        isPending: isLogin,
        isError: loginError,
    } = useMutation({
        mutationFn: fetchAuth.login,
        onSuccess: async (data) => {
            if (data.data?.user) {
                setAuthUser(data.data.user)
                console.log('SETTING AUTHENTICATE TO TRUE')
                setIsAuthenticated(true)
            }
        },
        onError: (error) => {
            console.error('Login failed:', error.message)
        },
    })

    // Mutation de logout
    const {
        mutate: logout,
        isPending: isLogout,
        isError: logoutError,
    } = useMutation({
        mutationFn: fetchAuth.logout,
        onSuccess: () => {
            console.log('we just logged out')
            setIsAuthenticated(false)
            setAuthUser(null)
        },
        onError: (error) => {
            console.error('Logout failed:', error.message)
        },
    })

    // Query de todoList pour provoquer la validation du token
    const {
        data: todos,
        error,
        isLoading,
    } = useQuery({
        queryFn: () => fetchTodos.getTodos(),
        queryKey: ['todos'],
        enabled: isAuthenticated,
        onError: (err) => {
            console.error('Fetching todos failed:', err.message)
        },
    })

    // Fonction asynchrone pour récupérer l'application et valider l'état d'authentification
    const getApp = async () => {
        try {
            const result = await fetchTodos.getTodos()
            console.log('Todos fetched successfully:', result)
            setIsAuthenticated(true)
            return result
        } catch (err) {
            console.error('Error fetching todos:', err.message)
            setIsAuthenticated(false) // Reset en cas d'échec
            throw err
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('IT SHOULD GET HERE IN EVERY REFRESH')
                await getApp() // Appelle getApp pour récupérer les données nécessaires
            } catch (error) {
                console.error('Error in fetchData:', error.message)
            }
        }

        fetchData()
    }, [])

    // Ajout d'une fonction "async" pour attendre explicitement la mutation
    const loginAsync = (formData) => {
        return new Promise((resolve, reject) => {
            login(formData, {
                onSuccess: resolve,
                onError: reject,
            })
        })
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                authUser,
                login,
                loginAsync,
                logout,
                isLogout,
                logoutError,
                isLogin,
                loginError,
                getApp,
                todos,
                error,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}
