const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
require('dotenv').config()

const app = express()

// Swagger setup
const swaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Authentication API',
			version: '1.0.0',
			description: 'API Documentation for Authentication',
		},
		servers: [
			{
				url: 'http://localhost:3000',
				description: 'Development server',
			},
		],
	},
	apis: ['./src/routes/*.js'],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Routes
app.use('/auth', authRoutes)

// Запуск сервера
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
	console.log(
		`Swagger documentation available at http://localhost:${PORT}/api-docs`
	)
})
