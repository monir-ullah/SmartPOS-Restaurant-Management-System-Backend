import { ConversationChain } from 'langchain/chains'
import { ChatMessageHistory, BufferMemory } from 'langchain/memory'
import { ChatOllama } from '@langchain/community/chat_models/ollama'
import mongoose from 'mongoose'
import axios from 'axios'
import weaviate, { WeaviateClient } from 'weaviate-client'

const weaviateURL =
  'neu2sx3csqy3lpu362fuug.c0.asia-southeast1.gcp.weaviate.cloud'
const weaviateApiKey =
  'TnVxWFdhbFo0RzJjU3ZOU19RZlRMd29rNCt5ZnBWWGpmUlhxbHlUUmJZL0pLakZRR2dhLzdremxRTllFPV92MjAw'

// Chat model and memory setup
const messageHistory = new ChatMessageHistory()
const chatModel = new ChatOllama({
  baseUrl: 'http://localhost:11434',
  model: 'gemma3',
})
// const chatModel = new ChatOllama({
//   baseUrl: 'http://localhost:11434',
//   model: 'gemma3',
// })

const memory = new BufferMemory({
  chatHistory: messageHistory,
  returnMessages: true,
})

const chain = new ConversationChain({
  llm: chatModel,
  memory,
})

const syncMongoToWeaviateAndSearch = async (question: string) => {
  let className = 'SmartPOSContext'

  // Check if class already exists

  // Sync MongoDB
  const db = mongoose.connection.db
  if (!db) throw new Error('MongoDB not connected')

  const collections = await db.listCollections().toArray()
  for (const { name } of collections) {
    if (name.startsWith('system.')) continue

    const model =
      mongoose.models[name] ||
      mongoose.model(name, new mongoose.Schema({}, { strict: false }))
    const docs = await model.find({}).lean()

    for (const doc of docs) {
      const text = JSON.stringify(doc)

      // Get embedding from Ollama
      const embedRes = await axios.post(
        'http://localhost:11434/api/embeddings',
        {
          model: 'llama3',
          prompt: text,
        }
      )
      const embedding = embedRes.data.embedding
    }
  }

  // Embed the user question
  const questionRes = await axios.post(
    'http://localhost:11434/api/embeddings',
    {
      model: 'llama3',
      prompt: question,
    }
  )
  const questionEmbedding = questionRes.data.embedding

  interface WeaviateSearchItem {
    content: string
    collection: string
  }

  interface WeaviateSearchResponse {
    data?: {
      Get?: {
        [key: string]: WeaviateSearchItem[]
      }
    }
  }
}

export { chain, syncMongoToWeaviateAndSearch }
