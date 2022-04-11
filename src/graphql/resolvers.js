import { UserInputError } from 'apollo-server-express'
import CharacterService from '../services/character_service'
import { inputLengthChecker } from '../utils/helpers'

const resolvers = {
  Query: {
    // Retorna una lista de "characters".
    characters: async (parent, args, context, info) => {
      const { take } = args
      if (take && take > 826) {
        throw new UserInputError('Bad Request. There is a limit of 826 items.')
      }
      try {
        const characters = await CharacterService.getMany(take || 20)
        return characters
      } catch (error) {
        return error
      }
    },
    // Retorna una lista de "characters" basado en su propiedad "name".
    character: async (parent, args, context, info) => {
      const { name } = args
      try {
        const characters = await CharacterService.getByName(name)
        return characters || []
      } catch (error) {
        return error
      }
    }
  },
  // Crea y retorna un nuevo "character" si exte no existe.
  // Si existe, retorna el "character" existente.
  Mutation: {
    createCharacter: async (parent, { input }, context, info) => {
      const isValid = inputLengthChecker(input)
      if (!isValid) {
        throw new UserInputError('Bad Request. All character properties must have at least 3 letters.')
      }
      try {
        const character = await CharacterService.findOrCreate({ ...input })
        return character
      } catch (error) {
        return error
      }
    }
  }
}

export { resolvers }
