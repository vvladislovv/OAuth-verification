import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'

// Создаем контекст для аутентификации
export const AuthContext = createContext(null)

// Хук для использования контекста аутентификации
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)

	// Проверка наличия токена при загрузке
	useEffect(() => {
		const token = localStorage.getItem('auth_token')
		if (token) {
			// Проверка валидности токена и получение данных пользователя
			fetchUserData(token)
		} else {
			setLoading(false)
		}
	}, [])

	// Получение данных пользователя
	const fetchUserData = async token => {
		try {
			// Здесь должен быть запрос к вашему API для проверки токена
			// и получения данных пользователя
			const response = await axios.get('/api/user', {
				headers: { Authorization: `Bearer ${token}` },
			})
			setUser(response.data)
		} catch (error) {
			console.error('Error fetching user data:', error)
			localStorage.removeItem('auth_token')
		} finally {
			setLoading(false)
		}
	}

	// Функция для выхода из системы
	const logout = () => {
		localStorage.removeItem('auth_token')
		setUser(null)
	}

	// Функция для обработки успешной аутентификации
	const handleAuthSuccess = (token, userData) => {
		localStorage.setItem('auth_token', token)
		setUser(userData)
	}

	const value = {
		user,
		loading,
		logout,
		handleAuthSuccess,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
