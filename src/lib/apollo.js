import 'isomorphic-fetch'
import ApolloClient, { createNetworkInterface } from 'apollo-client'

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3005/graphql', cachePolicy: { query: true, data: false }
})

export default new ApolloClient({ networkInterface,
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only'
    }
  }
})
