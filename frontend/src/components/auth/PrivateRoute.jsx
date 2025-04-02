import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

const PrivateRoute = ({ children }) => {
	const { user, loading } = useAuth()

	if (loading) {
		return <div className='loading'>Загрузка...</div>
	}

	if (!user) {
		return <Navigate to='/login' />
	}

	return children
}

export default PrivateRoute
