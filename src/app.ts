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

// // Handling cors issue
// app.use(
//   cors({
//     origin: 'https://fullstack-client-side.vercel.app',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     optionsSuccessStatus: 204,
//   }),
// )

// Handling cors issue
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  })
)

//app route
app.use('/', mainRoutes)

app.get('/', (req: Request, res: Response) => {
  res.json('SmartPOS: Restaurant Management System Backend Server is running')
})

// global error handler
app.use(globalErrorHandler)

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function (req, res) {
  res.json('Not found route')
})

export default app
