import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {ApolloClient} from 'apollo-client';
import {ApolloProvider} from '@apollo/react-hooks';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {setContext} from 'apollo-link-context';

export const AuthContext = React.createContext({});

const createApolloClient = accessToken => {
  const link = new HttpLink({
    uri: 'http://localhost:4000/graphql',
    headers: accessToken
      ? {
          Authorization: `Bearer ${accessToken}`,
        }
      : {},
  });
  const cache = new InMemoryCache();
  const client = new ApolloClient({
    link,
    cache,
  });
  return client;
};

export const withApollo = Component => {
  const WithApollo = ({apolloClient, apolloState, ...pageProps}) => {
    const [client, setClient] = useState(null);

    const fetchSession = async () => {
      console.log('------------------------------------');
      console.log('------------------------------------');
      console.log('---------- fetching session -----------------');
      console.log('----- session ------', session);
      console.log('------------------------------------');
      console.log('------------------------------------');
      let accessToken = null;
      const session = await AsyncStorage.getItem('session');
      if (session) {
        const parsedSession = JSON.parse(session);
        accessToken = parsedSession.accessToken;
      }
      // const {accessToken} = JSON.parse(session);
      console.log('--------------------');
      console.log('----------------------');
      console.log('accessToken', accessToken);
      console.log('----------------------');
      console.log('----------------------');
      const client = createApolloClient(accessToken);
      setClient(client);
    };

    React.useEffect(() => {
      fetchSession();
    }, []);

    if (!client) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <ApolloProvider client={client}>
        <AuthContext.Provider>
          <Component />
        </AuthContext.Provider>
      </ApolloProvider>
    );
  };
  return WithApollo;
};
