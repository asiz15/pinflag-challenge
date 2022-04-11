import { validationResult } from 'express-validator'
import BaseController from '../controllers/base'

// Intancia de la clase "BaseController", me pareció declarativo llamarlo Validator.
const Validator = new BaseController()

// Middleware para validar el parametro "name" requerido en request.
export const charactersByNameMiddleware = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return Validator.ErrorBadRequest(res, 'Bad request, you must provide a name in query params.')
  }
  next()
}

// Middleware para validar la información recibida al momento de crear un nuevo "character".
export const createCharacterMiddleware = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return Validator.ErrorBadRequest(res, { message: 'There was an error with your request 😅.', errors: errors.array().map(e => e.msg) })
  }
  next()
}
