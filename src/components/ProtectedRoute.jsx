import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PropTypes from 'prop-types'
import Loader from './ux/Loader'

const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth()

    // Si l'état de l'authentification est encore en cours de vérification, afficher un écran de chargement
    if (isLoading) {
        return (
            <div className="w-20 h-screen container border-2 border-x-red-400">
                <Loader />
            </div>
        ) // Vous pouvez personnaliser ceci avec un spinner, une animation, etc.
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

ProtectedRoute.propTypes = {
    element: PropTypes.node,
}

export default ProtectedRoute
