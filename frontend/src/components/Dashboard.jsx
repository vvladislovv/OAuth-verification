import React from 'react'
import { useAuth } from './auth/AuthContext'

const Dashboard = () => {
	const { user, logout } = useAuth()

	return (
		<div className='dashboard'>
			<h1>Добро пожаловать, {user?.name || user?.login || 'Пользователь'}!</h1>
			<div className='user-info'>
				{user?.avatar_url && (
					<img src={user.avatar_url} alt='Avatar' className='avatar' />
				)}
				<div className='user-details'>
					<p>
						<strong>Email:</strong> {user?.email || 'Не указан'}
					</p>
					{user?.bio && (
						<p>
							<strong>Bio:</strong> {user.bio}
						</p>
					)}
				</div>
			</div>
			<button onClick={logout} className='logout-button'>
				Выйти
			</button>
		</div>
	)
}

export default Dashboard
