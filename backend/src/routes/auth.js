const express = require('express')
const axios = require('axios')
const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: Access token
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             email:
 *               type: string
 *             name:
 *               type: string
 *             picture:
 *               type: string
 */

/**
 * @swagger
 * /auth/google:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Google OAuth Authentication
 *     description: Authenticate user using Google OAuth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: Authorization code from Google
 *               redirectUri:
 *                 type: string
 *                 description: Redirect URI used in OAuth flow
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Server error
 *     example:
 *       summary: Example request
 *       value:
 *         code: "4/0AeaYSHDxxxxxxxxxxxxxxxxxxx"
 *         redirectUri: "http://localhost:3000/auth/google/callback"
 */
router.post('/google', async (req, res) => {
	const { code, redirectUri } = req.body

	try {
		// Используем redirectUri из запроса или значение по умолчанию
		const finalRedirectUri =
			redirectUri || `${process.env.CLIENT_URL}/auth/google/callback`

		console.log('Google OAuth Request:', {
			code: code ? code.substring(0, 10) + '...' : 'undefined',
			redirect_uri: finalRedirectUri,
		})

		if (!code) {
			return res.status(400).json({ error: 'Authorization code is missing' })
		}

		const tokenResponse = await axios.post(
			'https://oauth2.googleapis.com/token',
			{
				code,
				client_id: process.env.GOOGLE_CLIENT_ID,
				client_secret: process.env.GOOGLE_CLIENT_SECRET,
				redirect_uri: finalRedirectUri,
				grant_type: 'authorization_code',
			}
		)

		const accessToken = tokenResponse.data.access_token

		const userResponse = await axios.get(
			'https://www.googleapis.com/oauth2/v2/userinfo',
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		)

		res.json({
			token: accessToken,
			user: userResponse.data,
		})
	} catch (error) {
		console.error(
			'Google OAuth Error:',
			error.response ? error.response.data : error.message
		)

		if (error.response) {
			console.error('Error response data:', error.response.data)
			console.error('Error response status:', error.response.status)

			return res.status(error.response.status).json({
				error: 'Authentication failed',
				details: error.response.data,
				message:
					'Проверьте настройки OAuth в консоли Google Cloud Platform. Убедитесь, что redirect_uri точно совпадает с настроенным в консоли Google.',
			})
		}

		res.status(500).json({ error: 'Authentication failed' })
	}
})

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Google OAuth Callback
 *     description: Callback endpoint for Google OAuth flow
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Authorization code from Google
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 *     example:
 *       summary: Example request
 *       value:
 *         code: "4/0AeaYSHDxxxxxxxxxxxxxxxxxxx"
 */
// Google OAuth Callback
router.get('/google/callback', async (req, res) => {
	const { code } = req.query

	try {
		// Добавляем логирование для отладки
		console.log('Google OAuth Callback Request:', {
			code: code ? code.substring(0, 10) + '...' : 'undefined',
			redirect_uri: `${process.env.CLIENT_URL}/auth/google/callback`,
		})

		// Проверяем, что код существует
		if (!code) {
			return res.status(400).json({ error: 'Authorization code is missing' })
		}

		// Используем правильный client_id (без VITE_ префикса)
		const tokenResponse = await axios.post(
			'https://oauth2.googleapis.com/token',
			{
				code,
				client_id: process.env.GOOGLE_CLIENT_ID, // Используем GOOGLE_CLIENT_ID вместо VITE_GOOGLE_CLIENT_ID
				client_secret: process.env.GOOGLE_CLIENT_SECRET,
				redirect_uri: `${process.env.CLIENT_URL}/auth/google/callback`,
				grant_type: 'authorization_code',
			}
		)

		const accessToken = tokenResponse.data.access_token

		const userResponse = await axios.get(
			'https://www.googleapis.com/oauth2/v2/userinfo',
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		)

		res.json({
			token: accessToken,
			user: userResponse.data,
		})
	} catch (error) {
		console.error('Google OAuth Callback Error:', error)

		// Улучшенная обработка ошибок с более подробной информацией
		if (error.response) {
			console.error('Error response data:', error.response.data)
			console.error('Error response status:', error.response.status)

			// Возвращаем более информативное сообщение об ошибке
			return res.status(error.response.status).json({
				error: 'Authentication failed',
				details: error.response.data,
				message:
					'Проверьте настройки OAuth в консоли Google Cloud Platform. Убедитесь, что redirect_uri точно совпадает с настроенным в консоли Google.',
			})
		}

		res.status(500).json({ error: 'Authentication failed' })
	}
})

/**
 * @swagger
 * /auth/github:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: GitHub OAuth Authentication
 *     description: Authenticate user using GitHub OAuth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: Authorization code from GitHub
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       500:
 *         description: Server error
 *     example:
 *       summary: Example request
 *       value:
 *         code: "a1b2c3d4e5f6g7h8i9j0"
 */
// GitHub OAuth
router.post('/github', async (req, res) => {
	const { code } = req.body

	try {
		const tokenResponse = await axios.post(
			'https://github.com/login/oauth/access_token',
			{
				client_id: process.env.VITE_GITHUB_CLIENT_ID,
				client_secret: process.env.GITHUB_CLIENT_SECRET,
				code,
			},
			{
				headers: {
					Accept: 'application/json',
				},
			}
		)

		const accessToken = tokenResponse.data.access_token

		const userResponse = await axios.get('https://api.github.com/user', {
			headers: {
				Authorization: `token ${accessToken}`,
			},
		})

		res.json({
			token: accessToken,
			user: userResponse.data,
		})
	} catch (error) {
		console.error('GitHub OAuth Error:', error)
		res.status(500).json({ error: 'Authentication failed' })
	}
})

/**
 * @swagger
 * /auth/github/callback:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: GitHub OAuth Callback
 *     description: Callback endpoint for GitHub OAuth flow
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Authorization code from GitHub
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       500:
 *         description: Server error
 *     example:
 *       summary: Example request
 *       value:
 *         code: "a1b2c3d4e5f6g7h8i9j0"
 */
// GitHub OAuth Callback
router.get('/github/callback', async (req, res) => {
	const { code } = req.query

	try {
		const tokenResponse = await axios.post(
			'https://github.com/login/oauth/access_token',
			{
				client_id: process.env.VITE_GITHUB_CLIENT_ID,
				client_secret: process.env.GITHUB_CLIENT_SECRET,
				code,
			},
			{
				headers: {
					Accept: 'application/json',
				},
			}
		)

		const accessToken = tokenResponse.data.access_token

		const userResponse = await axios.get('https://api.github.com/user', {
			headers: {
				Authorization: `token ${accessToken}`,
			},
		})

		res.json({
			token: accessToken,
			user: userResponse.data,
		})
	} catch (error) {
		console.error('GitHub OAuth Callback Error:', error)
		res.status(500).json({ error: 'Authentication failed' })
	}
})

module.exports = router
