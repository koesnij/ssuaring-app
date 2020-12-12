import Constants from 'expo-constants';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { split, ApolloLink, Observable } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AsyncStorage } from 'react-native';

export const cache = new InMemoryCache();
//
const httpLink = new HttpLink({
  uri: `http://${Constants.manifest.debuggerHost.split(':').shift()}:4000`,
});

const wsLink = new WebSocketLink({
  uri: `ws://${Constants.manifest.debuggerHost.split(':').shift()}:4000`,
  options: {
    reconnect: true,
  },
});

const request = async (operation) => {
  const token = await AsyncStorage.getItem('jwt');
  return operation.setContext({
    headers: { Authorization: `Bearer ${token}` },
  });
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle;
      Promise.resolve(operation)
        .then((oper) => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

export const options = {
  link: ApolloLink.from([
    /*onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        sendToLoggingService(graphQLErrors);
      }
      if (networkError) {
        logoutUser();
      }
    }),*/
    requestLink,
    withClientState({
      defaults: {
        isConnected: true,
      },
      resolvers: {
        Mutation: {
          updateNetworkStatus: (_, { isConnected }, { cache }) => {
            cache.writeData({ data: { isConnected } });
            return null;
          },
        },
      },
      cache,
    }),
    split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      httpLink
    ),
  ]),
  cache,
  //uri: `http://${Constants.manifest.debuggerHost.split(':').shift()}:4000`,
};

export const ServerURI = `http://${Constants.manifest.debuggerHost
  .split(':')
  .shift()}:4000`;
