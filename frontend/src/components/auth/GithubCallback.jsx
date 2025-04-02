import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

const GithubCallback = () => {
	const [error, setError] = useState(null)
	const navigate = useNavigate()
	const { handleAuthSuccess } = useAuth()

	useEffect(() => {
		const fetchData = async () => {
			// Получаем код из URL
			const urlParams = new URLSearchParams(window.location.search)
			const code = urlParams.get('code')

			if (code) {
				try {
					// Обмен кода на токен должен происходить на сервере
					// Здесь мы делаем запрос к нашему бэкенду
					const response = await axios.post(
						'http://localhost:3000/api/auth/github',
						{ code }
					)

					// Обрабатываем успешную аутентификацию
					handleAuthSuccess(response.data.token, response.data.user)

					// Перенаправляем пользователя
					navigate('/dashboard')
				} catch (err) {
					console.error('Authentication error:', err)
					setError('Произошла ошибка при аутентификации')
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

export default GithubCallback
