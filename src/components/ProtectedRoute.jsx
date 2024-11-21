import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

const ProtectedRoute = ({ element }) => {
    const { isAuthenticated, authUser } = useAuth()

    console.log('ProtectedRoute isAuthenticated : ' + isAuthenticated)
    console.log('ProtectedRoute authUser : ', authUser)

    return isAuthenticated ? element : <Navigate to="/login" replace />
}

ProtectedRoute.propTypes = {
    element: PropTypes.node.isRequired,
}

export default ProtectedRoute
