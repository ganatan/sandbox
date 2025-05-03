import express from 'express'

import responseHandler from '../../infrastructure/logger/response-handler.js'

import LLMClient from './llm.client.js'
import LLMService from './llm.service.js'
import LLMController from './llm.controller.js'

import config from '../../config/config.js'

const router = express.Router()

const client = new LLMClient({ mock: config.mock, provider: config.provider })
const service = new LLMService(client)
const controller = new LLMController(service)

router.get('/filmography', controller.getFilmography)
// router.post('/biography', controller.getBiography)

// router.get('/filmography', controller.getFilmography, responseHandler)
// router.post('/biography', controller.getBiography, responseHandler)

// router.get('/filmography', (req, res, next) => {
//   res.status(404).json({ error: 'filmography' })
// })


// router.get('/toto', (req, res, next) => {
//   res.locals.data = { process: 'toto' };
//   next()
// })

// router.get('/', (req, res) => {
//   res.status(404).json({ error: 'llm root' })
// })

// router.get('*', (req, res) => {
//   res.status(404).json({ error: 'llm not found' })
// })

export default router
