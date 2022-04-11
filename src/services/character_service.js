import axios from 'axios'
import models from '../models'
import { Op } from 'sequelize'
import { getArrOfUrls } from '../utils/helpers'

class CharacterService {
  constructor () {
    this.sourceUrl = 'https://rickandmortyapi.com/api/character'
  }

  // **** extractCharacterRelevantInfo ****
  // Retorna un objeto del tipo "character" solo con las propiedades id,name,status,species,origin
  // Se mantiene el campo id solo por practicidad al momento de leer las respuestas.
  extractCharacterRelevantInfo (character) {
    return {
      id: character?.id,
      name: character?.name,
      status: character?.status,
      species: character?.species,
      origin: character?.origin?.name
    }
  }

  // **** paginatedApiCall ****
  // Extrae y retorna el/los resultados de un request o null.
  async paginatedApiCall (url) {
    try {
      const { data } = await axios(url)
      return data?.results
    } catch (error) {
      return null
    }
  }

  // **** getCharactersByNameFromAPI ****
  // Retorna una lista de "characters" o null, como resultado de una petición a la API usando "name" como query param
  async getCharactersByNameFromAPI (name) {
    try {
      let mergedCharacters = []
      // Request inicial a la API
      const firstRequest = await axios(`${this.sourceUrl}?name=${name}`)

      if (firstRequest?.data?.info && firstRequest?.data?.results) {
        const { pages } = firstRequest?.data?.info
        // Guarda los "characters" del request inicial
        mergedCharacters = [...firstRequest?.data?.results]
        // Si existe más de 1 página de resultados
        if (pages && pages > 1) {
          // Genera un array de urls con los resultados faltantes
          const urls = getArrOfUrls(`${this.sourceUrl}?name=${name}&page=`, pages, 2)
          // Realiza n requests a la API en base a las urls generadas en el punto anterior
          return axios.all(urls.map((page) => this.paginatedApiCall(page))).then(
            // En caso de éxito
            (mergedResponse) => {
              // 1. Concatena los "characters" de cada respuesta
              // 2. Agrega los "characters" concatenados a los existentes del primer request
              // 3. Extrae de cada "character" solo las propiedades necesarias
              mergedCharacters = [...mergedCharacters, ...mergedResponse.reduce((a, b) => {
                return a.concat(b)
              })].map(character => this.extractCharacterRelevantInfo(character))

              // 4. Retorna un array de "characters"
              return mergedCharacters
            }
          )
        }
      }
      // Extrae de cada "character" solo las propiedades necesarias y retorna una lista de "characters"
      return mergedCharacters.map(character => this.extractCharacterRelevantInfo(character))
    } catch (error) {
      return null
    }
  }

  // **** getCharactersByNameFromDB *****
  // Retorna una lista de "characters" o null, como resultado de la búsqueda en la DB de personajes con "name" LIKE "%name%"
  async getCharactersByNameFromDB (name) {
    try {
      const characters = await models.Character.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`
          }
        },
        raw: true
      })
      return characters
    } catch (error) {
      return null
    }
  }

  // **** findOrCreate *****
  // Retorna y crea un nuevo "character" en base a la información de "characterInput" si este no existe en la DB.
  // Si existe, retorna el "character" existente.
  // **Es igual si CADA una de sus propiedades coincide**
  async findOrCreate (characterInput) {
    try {
      const [character] = await models.Character.findOrCreate({ where: { ...characterInput } })
      return character
    } catch (error) {
      return error
    }
  }

  // ****getMany****
  // Retorna una lista con N "characters"
  async getMany (n = 20) {
    // Calcula la cantidad de páginas necesarias para retornar "n" "characters"
    const pages = Math.ceil(+n / 20) || 1
    // Genera un array de urls con la cantidad de páginas obtenidas en el punto anterior
    const urls = await getArrOfUrls(`${this.sourceUrl}?page=`, pages, 1)
    try {
      let characters = []
      // Realiza n requests a la API en base a las urls generadas en el punto anterior
      await axios.all(urls.map((page) => this.paginatedApiCall(page))).then(
        // En caso de éxito
        // 1. Concatena los "characters" de cada respuesta
        // 2. Selecciona de la lista de "characters", solo los solicitados a través de "n"
        (mergedResponse) => {
          characters = mergedResponse.reduce((a, b) => {
            return a.concat(b)
          }).slice(0, n)
        }
      )
      // Extrae de cada "character" solo las propiedades necesarias y retorna una lista de "characters"
      return characters.map(character => this.extractCharacterRelevantInfo(character))
    } catch (error) {
      return error
    }
  }

  // ****getByName****
  // Retorna una lista de "characters" como resultado de búsqueda en base al parametro "name"
  async getByName (name) {
    try {
      // Busca "characters" en la DB
      const charactersFromDB = await this.getCharactersByNameFromDB(name)
      // Si hay resultados
      if (charactersFromDB.length > 0) {
        // Retorna los resultados
        return charactersFromDB
      }
      // Si no hay resultados
      // Busca en la API y retorna sus resultados
      return this.getCharactersByNameFromAPI(name)
    } catch (error) {
      console.error(error)
      return null
    }
  }

  // **** findAndDelete ****
  // Utilizado en los tests
  async findAndDelete (name) {
    await models.Character.destroy({
      where: {
        name: name
      },
      force: true
    })
  }
}

const CharacterServiceInstance = new CharacterService()

export default CharacterServiceInstance
