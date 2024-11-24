import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PropTypes from 'prop-types'
import Loader from './ux/Loader'

const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) {
        return (
            <div className="w-20 h-screen container border-2 border-x-red-400">
                <Loader />
            </div>
        )
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

ProtectedRoute.propTypes = {
    element: PropTypes.node,
}

export default ProtectedRoute
