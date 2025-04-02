import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

const GoogleCallback = () => {
	const [error, setError] = useState(null)
	const navigate = useNavigate()
	const { handleAuthSuccess } = useAuth()

	useEffect(() => {
		const fetchData = async () => {
			const urlParams = new URLSearchParams(window.location.search)
			const code = urlParams.get('code')

			if (code) {
				try {
					const response = await axios.post('/auth/google', {
						code,
						redirectUri: 'http://localhost:8080/auth/google/callback',
					})

					handleAuthSuccess(response.data.token, response.data.user)
					navigate('/dashboard')
				} catch (err) {
					if (err.response) {
						console.error('Authentication error:', err.response.data)
						setError(
							`Ошибка: ${err.response.status} - ${err.response.statusText}`
						)
					} else {
						console.error('Authentication error:', err)
						setError('Произошла ошибка при аутентификации')
					}
				}
			} else {
				setError('Код авторизации не получен')
			}
		}

		fetchData()
	}, [navigate, handleAuthSuccess])

	if (error) {
		return <div className='auth-error'>{error}</div>
	}

	return <div className='loading'>Выполняется вход...</div>
}

export default GoogleCallback
