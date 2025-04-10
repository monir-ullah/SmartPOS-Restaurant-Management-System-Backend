import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { mainRoutes } from './app/routes/routes'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import bodyParser from 'body-parser'
import { CompletedOrderController } from './app/modules/completedOrder/completedOrder.controller'

// import globalErrorHandler from './app/middlewares/globalErrorHandler'

const app: Application = express()

// Express Parsers
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// CORS configuration
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
)

// Health check route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'SmartPOS: Restaurant Management System Backend Server is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  })
})

//app route
app.use('/', mainRoutes)

// global error handler
app.use(globalErrorHandler)

// 404 Route
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
})

export default app
