import React from 'react'

const GoogleLogin = () => {
	const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
	const redirectUri = `http://localhost:8080/auth/google/callback`

	const handleLogin = () => {
		const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email profile`
		window.location.href = googleAuthUrl
	}

	return (
		<button onClick={handleLogin} className='google-login-button'>
			Войти через Google
		</button>
	)
}

export default GoogleLogin
