import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './type_defs'
import { resolvers } from './resolvers'

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
})
