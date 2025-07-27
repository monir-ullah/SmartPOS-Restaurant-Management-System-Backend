import { ConversationChain } from 'langchain/chains'
import { ChatMessageHistory, BufferMemory } from 'langchain/memory'
import { ChatOllama } from '@langchain/community/chat_models/ollama'

import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { mainRoutes } from './app/routes/routes'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import bodyParser from 'body-parser'

// import globalErrorHandler from './app/middlewares/globalErrorHandler'

const app: Application = express()

// Express Parsers
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// CORS configuration
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:5174',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
)

// Chat model and memory setup
const messageHistory = new ChatMessageHistory()
const chatModel = new ChatOllama({
  baseUrl: 'http://localhost:11434',
  model: 'llama3',
})

const memory = new BufferMemory({
  chatHistory: messageHistory,
  returnMessages: true,
})

const chain = new ConversationChain({
  llm: chatModel,
  memory,
})

// Health check route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'SmartPOS: Restaurant Management System Backend Server is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  })
})

app.post('/chat', async (req, res) => {
  const messageHistory = new ChatMessageHistory()
  const { message } = req.body

  try {
    const response = await chain.call({ input: message })
    res.json({ response: response.response })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Something went wrong' })
  }
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
