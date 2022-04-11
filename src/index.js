import './config/environment'
import './models'
import { apolloServer } from './graphql/apollo_server'
import app from './app'

const port = process.env.PORT || 5000

const startServer = async () => {
  await apolloServer.start()
  apolloServer.applyMiddleware({ app, path: '/graphql' })
  app.listen(port, () => {
    console.log(`API running on http://127.0.0.1:${port}/`)
  })
}

startServer()
