import { json } from 'body-parser'
import mongoose from 'mongoose'
import { chain, syncMongoToWeaviateAndSearch } from './chat.utils'

const chatService = async (message: string) => {
  // const databaseContext = syncMongoToWeaviateAndSearch(message)

  const databaseConnection = mongoose.connection.db
  if (!databaseConnection) throw new Error('MongoDB not connected')

  const databaseContext: Record<string, any[]> = {}

  const collections = await databaseConnection.listCollections().toArray()
  for (const { name } of collections) {
    if (name.startsWith('system.')) continue

    const model =
      mongoose.models[name] ||
      mongoose.model(name, new mongoose.Schema({}, { strict: false }))

    const docs = await model.find({}).lean()
    databaseContext[name] = docs
  }

  // return databaseContext
  const finalPrompt = `You are an intelligent AI assistant for a restaurant POS (Point of Sale) system. Your job is to help users by answering their questions based on the restaurant’s POS data and software functionality.

  Do not ask for or share any user's username or password under any circumstance.

  If a question is not related to the database or the POS system directly, use your model's reasoning ability to respond intelligently. Think carefully, be efficient, and always provide responses that are accurate, helpful, and user-friendly.

  Use the context below to answer the user's question.

  Context:
  ${JSON.stringify(databaseContext, null, 2)}

  Question:
  ${message}`

  const response = await chain.call({ input: finalPrompt })

  return response.response.replace(/[^\w\s.,!?]/g, '') || 'No response.'
}

export const ChatService = { chatService }
