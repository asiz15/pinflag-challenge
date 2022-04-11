import app from 'express'
import CharacterController from '../controllers/character_controller'

const routes = app.Router()

routes.get('/', new CharacterController().show)

export default routes
