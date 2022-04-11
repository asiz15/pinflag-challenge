import '../src/config/environment'
import '../src/models'
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "../src/graphql/type_defs";
import { resolvers } from '../src/graphql/resolvers'
import sequelize from '../src/config/sequelize'
import { defaultCharacter, shortCharacter } from '../src/utils/mocked_data'

const testServer = new ApolloServer({
    typeDefs,
    resolvers
})

describe('Query: characters', () => {

    describe('when variable "take" is not provided', () => {
        test('should return a list of 20 characters', async() => { 
            const { data,errors } = await testServer.executeOperation({
                query: 'query characters{ characters { id,name,status,species,origin } }'
              });
              expect(errors).toBeUndefined();
              expect(data.characters).toBeInstanceOf(Array);
              expect(data.characters).toHaveLength(20);
         })
    })
    
    describe('when variable "take" (n) is provided', () => {

     test('should return a list of n characters', async() => { 
        const { data,errors } = await testServer.executeOperation({
            query: 'query characters($take: Int) { characters(take: $take){ id,name,status,species,origin } }',
            variables: { take: 3 },
          });
          expect(errors).toBeUndefined();
          expect(data.characters).toHaveLength(3);
     })
     test('should return a list of n characters', async() => { 
        const { data,errors } = await testServer.executeOperation({
            query: 'query characters($take: Int) { characters(take: $take){ id,name,status,species,origin } }',
            variables: { take: 99 },
          });
          expect(errors).toBeUndefined();
          expect(data.characters).toHaveLength(99);
     })

     test('should return an error if n > 826', async() => { 
        const { errors } = await testServer.executeOperation({
            query: 'query characters($take: Int) { characters(take: $take){ id,name,status,species,origin } }',
            variables: { take: 827 },
          });
          expect(errors).toBeDefined();
          expect(errors[0].message).toMatch('Bad Request. There is a limit of 826 items.');
     })

    })
})

describe('Query: character', () => {
    describe('when variable "name" is not provided', () => {
        test('should return an error', async() => { 
            const { errors } = await testServer.executeOperation({
                query: 'query character{ character { id,name,status,species,origin } }'
              });
              expect(errors).toBeDefined();
         })
    })
    describe('when variable "name" is provided', () => {
        test('should return an array', async() => { 
            const result = await testServer.executeOperation({
                query: 'query character($name: String!) { character(name: $name){ id,name,status,species,origin } }',
                variables: { name: 'sahgdashgsahg' },
              });
              expect(result.errors).toBeUndefined();
              expect(result.data.character).toBeInstanceOf(Array);
         })
    })
})

describe('Mutation: createCharacter', () => {
    describe('when input contains all required fields', () => {
        test('should return a character', async() => { 
            const { data,errors } = await testServer.executeOperation({
                query: 'mutation createCharacter($input: CreateCharacterInput!) { createCharacter(input: $input){ id,name,status,species,origin } }',
                variables: { input: {...defaultCharacter} },
              });
              expect(errors).toBeUndefined();
              expect(data.createCharacter?.id).toBeDefined();
         })
    })
    describe('when some input property has length < 3', () => {
        test('should return an error', async() => { 
            const {errors} = await testServer.executeOperation({
                query: 'mutation createCharacter($input: CreateCharacterInput!) { createCharacter(input: $input){ id,name,status,species,origin } }',
                variables: { input: {...shortCharacter} },
              });
              expect(errors).toBeDefined();
         })
    })

    afterAll( async () =>{
        await sequelize.close()
    })
})