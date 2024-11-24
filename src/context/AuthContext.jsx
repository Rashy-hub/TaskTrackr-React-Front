import PropTypes from 'prop-types'
import { createContext, useContext, useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import fetchAuth from '../services/fetchAuth'
import fetchTodos from '../services/fetchTodos'

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [authUser, setAuthUser] = useState(null)
    const [isAuthChecked, setIsAuthChecked] = useState(false)
    const queryClient = useQueryClient()

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

            queryClient.invalidateQueries(['todos'])
        },
        onError: (error) => {
            console.error('Logout failed:', error.message)
        },
    })

    const { data: todos, error } = useQuery({
        queryFn: () => fetchTodos.getTodos(),
        queryKey: ['todos'],
        enabled: isAuthenticated,
        onError: (err) => {
            console.error('Fetching todos failed:', err.message)
        },
    })

    const getApp = async () => {
        try {
            const result = await fetchTodos.getTodos()
            setIsAuthenticated(true)
            setIsAuthChecked(true)
            return result
        } catch (err) {
            console.error('Error fetching todos:', err.message)
            setIsAuthenticated(false)
            setIsAuthChecked(true)
            throw err
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('IT SHOULD GET HERE IN EVERY REFRESH')
                await getApp()
            } catch (error) {
                console.error('Error in fetchData:', error.message)
                setIsAuthenticated(false)
            }
        }

        fetchData()
    }, [])

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
                isLoading: !isAuthChecked,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}
