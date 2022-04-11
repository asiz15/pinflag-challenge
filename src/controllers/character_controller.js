// import models from '../models'
import BaseController from './base'
import CharacterService from '../services/character_service'

export default class CharacterController extends BaseController {
  CharacterController () { }

  async index (req, res) {
    const { name } = req.query
    try {
      const characters = await CharacterService.getByName(name)

      return characters && characters !== null ? super.Success(res, characters) : super.NotFound(res, { message: 'Character not found.', status: 404 })
    } catch (error) {
      return super.InternalError(res, 'Ups! something went wrong :(')
    }
  }

  async create (req, res) {
    const { name, status, species, origin } = req.body
    try {
      const character = await CharacterService.findOrCreate({ name, status, species, origin })
      return character?.id ? super.Success(res, character) : super.InternalError(res, 'Ups, something went wrong.')
    } catch (error) {
      return error
    }
  }

  async show (req, res) {
    const { items = 20 } = req.query
    // Quizás sería una buena idea llevarlo a su propio middleware, lo dejo acá solo por simplicidad
    if (items && items > 826) {
      return super.ErrorBadRequest(res, { message: 'Bad Request. There is a limit of 826 items.', status: 400 })
    }
    try {
      const results = await CharacterService.getMany(items)
      return super.Success(res, results)
    } catch (error) {
      return super.InternalError(res, error)
    }
  }
}
