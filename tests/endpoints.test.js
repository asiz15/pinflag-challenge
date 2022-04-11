import '../src/config/environment'
import '../src/models'
import sequelize from '../src/config/sequelize'
import app from '../src/app'
import request from 'supertest'
import CharacterService from '../src/services/character_service'
import { defaultCharacter, randomCharacter, characterWithoutName,characterWithoutStatus, characterWithoutSpecies, characterWithoutOrigin } from '../src/utils/mocked_data'

const api = request(app)

describe('GET /characters', () => {

  test('should return a 200 status code', async () => {
    const { status } = await api.get('/characters')
    expect(status).toBe(200)
  })

  test('should have a content-type: application/json in headers', async () => {
    const { headers } = await api.get('/characters')
    expect(headers['content-type']).toEqual(expect.stringContaining('json'))
  })

  describe('when items is not provided in params', () => {
    test('should return an array with length === 20 ', async () => {
      const {body} = await api.get('/characters')
      expect(body).toBeInstanceOf(Array)
      expect(body).toHaveLength(20)
    })
  })

  describe('when items (n) is provided in params', () => {
    test('should return an array with length === n', async () => {
      const { body } = await api.get('/characters?items=33')
      expect(body).toHaveLength(33)
    })
  
    test('should return an array with length === n', async () => {
      const { body } = await api.get('/characters?items=2')
      expect(body).toHaveLength(2)
    })
  })
  describe('when items is provided as 0', () => {
    test('should return an empty array', async () => {
      const { body } = await api.get('/characters?items=0')
      expect(body).toHaveLength(0)
    })
  })
  describe('when items is provided and > 826', () => {
    test('should return an error with 400 status code', async () => {
      const { status } = await api.get('/characters?items=827')
      expect(status).toBe(400)
    })
  })
})

describe('GET /character', () => {
  beforeEach(async()=> {
    await CharacterService.findOrCreate({...defaultCharacter})
    await CharacterService.findAndDelete('somenon-existingnameasqueryparam')
  })
  test('should return a 200 status code', async () => {
    const { status } = await api.get('/character?name=default')
    expect(status).toBe(200)
  })
  test('should have a content-type: application/json in headers', async () => {
    const { headers } = await api.get('/character?name=default')
    expect(headers['content-type']).toEqual(expect.stringContaining('json'))
  })

  describe('when name is not provided', () => {
    test('should return a 400 status code', async () => {
      const { status } = await request(app).get('/character')
      expect(status).toBe(400)
    })
  })

  describe('when there are no results', () => {
    test('should return a 404 status code', async () => {
      const { status } = await request(app).get('/character?name=somenon-existingnameasqueryparam') //
      expect(status).toBe(404)
    })
  })

})

describe('POST /character', () => {
  describe('when body contains all required fields', () => {

    test('should create and return a new character', async() => { 
      const { headers, body } = await api.post('/character').send(randomCharacter)
        expect(200)
        expect(headers['content-type']).toEqual(expect.stringContaining('json'))
        expect([body.id, body.name, body.status, body.species, body.origin]).toBeDefined()
        expect(body.name).toBe(randomCharacter.name)
     })
  })
  
   describe('when some field is missing in request body', () => {

    test('should return an error with status code 400 when "name" property is missing.', async() => { 
      const { headers } = await api.post('/character').send(characterWithoutName)
        expect(400)
        expect(headers['content-type']).toEqual(expect.stringContaining('json'))
     })

    test('should return an error with status code 400 when "status" property is missing.', async() => { 
      const { headers } = await api.post('/character').send(characterWithoutStatus)
        expect(400)
        expect(headers['content-type']).toEqual(expect.stringContaining('json'))
     })

     test('should return an error with status code 400 when "species" property is missing.', async() => { 
      const { headers } = await api.post('/character').send(characterWithoutSpecies)
        expect(400)
        expect(headers['content-type']).toEqual(expect.stringContaining('json'))
     })

     test('should return an error with status code 400 when "origin" property is missing.', async() => { 
      const { headers } = await api.post('/character').send(characterWithoutOrigin)
        expect(400)
        expect(headers['content-type']).toEqual(expect.stringContaining('json'))
     })

   })

  afterAll( async () =>{
    await sequelize.close()
})
})




