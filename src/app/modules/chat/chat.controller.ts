import httpStatus from 'http-status'
import sendResponse from '../../utilities/sendResponse'
import { catchAsyncFunc } from '../../utilities/catchAsyncFunc'
import { Request, Response } from 'express'
import { ChatService } from './chat.service'

const chatAppController = catchAsyncFunc(
  async (req: Request, res: Response) => {
    const { message } = req.body
    const result = await ChatService.chatService(message)

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'AI response generated successfully',
      data: result,
    })
  }
)

export const ChatController = {
  chatAppController,
}
