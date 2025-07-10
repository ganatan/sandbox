import express from 'express'

// import llmRouter from './modules/llm/llm.router.js'

import responseHandler from './infrastructure/logger/response-handler.js'
import errorHandler from './infrastructure/logger/error-handler.js'
import notFoundHandler from './infrastructure/logger/not-found-handler.js'

process.removeAllListeners('warning')

const app = express()
app.use(express.json())

// app.use('/llm', llmRouter)

app.use((req, res, next) => {
  res.locals = res.locals || {};
  next();
});

app.get('/', (req, res) => {
  res.status(200).json(
    {
      "success": true,
      "message": "Welcome to the API. See /api-docs for usage."
    })

})

app.get('/persons', (req, res, next) => {
  res.locals = {
    data: {
      name: 'spielberg'
    },
    statusCode: 200
  }
  next()
})

app.get('/cities', (req, res, next) => {
  const error = new Error('Erreur volontaire dans /cities')
  error.statusCode = 500
  error.context = 'GET /cities'
  next(error)
})

app.use(notFoundHandler)
app.use(responseHandler)
app.use(errorHandler)

export default app
