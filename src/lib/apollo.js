import 'isomorphic-fetch'
import ApolloClient, { createNetworkInterface } from 'apollo-client'

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3005/graphql'
})

export default new ApolloClient({ networkInterface })
