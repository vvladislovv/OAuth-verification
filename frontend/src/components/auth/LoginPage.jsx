import React from 'react'
import GithubLogin from './GithubLogin'
import GoogleLogin from './GoogleLogin'

const LoginPage = () => {
	return (
		<div className='login-container'>
			<h2>Вход в систему</h2>
			<div className='login-options'>
				<GithubLogin />
				<GoogleLogin />
			</div>
		</div>
	)
}

export default LoginPage
