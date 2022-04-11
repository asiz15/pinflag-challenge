import app from 'express'
import { query, checkSchema } from 'express-validator'
import CharacterController from '../controllers/character_controller'
import { charactersByNameMiddleware, createCharacterMiddleware } from '../middlewares'
import { characterSchema } from '../utils/schemas'

const routes = app.Router()

// Se extrae a una ruta nombrada en singular.
// Cuando se crea un "character" a través del método POST, hace referencia explícita a 1 "character"
// Algo similar a cuando se busca por nombre, aunque la respuesta pueda incluir multiples resultados
// Creí que sería una buena idea 😃

// Validación a través de middlewares usando express-validator (src/middlewares)
routes.get('/', query('name').exists().isString(), charactersByNameMiddleware, new CharacterController().index)
routes.post('/', checkSchema({ ...characterSchema }), createCharacterMiddleware, new CharacterController().create)

export default routes
