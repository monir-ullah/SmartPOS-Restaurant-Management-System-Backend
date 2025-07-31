import { Router } from 'express'
import { ChatController } from './chat.controller'

const router = Router()

// router.post('/message', ChatController.chatAppController)
router.post('/message', ChatController.chatAppController)

export const chatAppRoutes = router
