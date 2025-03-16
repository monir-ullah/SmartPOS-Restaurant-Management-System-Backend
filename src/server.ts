/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express'
import { connect } from 'mongoose'
import config from './app/config'
import app from './app'

// Starting the server

async function serverStart() {
  try {
    await connect(config.database_url as string)
    app.listen(config.port, () => {
      console.log(`Server is Running on port ${config.port}`)
    })
  } catch (error) {
    console.log(error)
    return error
  }
}
serverStart()
