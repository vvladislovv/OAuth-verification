import React from 'react'

const GithubLogin = () => {
	const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID
	const redirectUri = `http://localhost:3000/auth/github/callback`

	const handleLogin = () => {
		const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`
		window.location.href = githubAuthUrl
	}

	return (
		<button onClick={handleLogin} className='github-login-button'>
			Войти через GitHub
		</button>
	)
}

export default GithubLogin
