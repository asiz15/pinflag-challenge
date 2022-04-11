import { gql } from 'apollo-server-express'

export const typeDefs = gql`
    type Character{
        id: ID
        name: String
        status: String
        species: String
        origin: String
    }
    input CreateCharacterInput{
        name: String!
        status: String!
        species: String!
        origin: String!
    }
    type Query {
        """
        Return a list of characters.
        """
        characters(take: Int): [Character!]
        """
        Return a list or a single character based on name.
        """
        character(name: String!): [Character!]
    }
    type Mutation {
        createCharacter(input:CreateCharacterInput!): Character!
    }
`
