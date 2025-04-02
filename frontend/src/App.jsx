import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { AuthProvider } from './components/auth/AuthContext'
import GithubCallback from './components/auth/GithubCallback'
import GoogleCallback from './components/auth/GoogleCallback'
import LoginPage from './components/auth/LoginPage'
import PrivateRoute from './components/auth/PrivateRoute' // Компонент для защищенных маршрутов
import Dashboard from './components/Dashboard' // Импортируем Dashboard

function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path='/login' element={<LoginPage />} />
					<Route path='/auth/github/callback' element={<GithubCallback />} />
					<Route path='/auth/google/callback' element={<GoogleCallback />} />
					<Route
						path='/dashboard'
						element={
							<PrivateRoute>
								<Dashboard />
							</PrivateRoute>
						}
					/>
					<Route path='/' element={<LoginPage />} />
				</Routes>
			</Router>
		</AuthProvider>
	)
}

export default App
