import React, { useState, useEffect } from 'react';
import { Text, View, AsyncStorage, TouchableOpacity } from 'react-native';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Ionicons } from '@expo/vector-icons';

import ApolloClient from 'apollo-boost';
import { persistCache } from 'apollo-cache-persist';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import apolloClientOptions from './apollo';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null); // true: in / false: out / null: not checked
  const preLoad = async () => {
    try {
      // Ionicons, Asset preload
      await Font.loadAsync({
        ...Ionicons.font,
      });
      // await Asset.loadAsync(require('./assets/logo.png')); // 배경, 로고 이미지 등

      // AsyncStorage를 찾으면 cache로 가져옴 (restore)
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage,
      });

      // 아폴로 클라이언트 생성
      const client = new ApolloClient({
        cache,
        ...apolloClientOptions,
      });
      setClient(client);

      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedIn === null || isLoggedIn === 'false') {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }

      setLoaded(true);
    } catch (e) {
      console.log(e);
    }
  };

  // 컴포넌트가 마운트될 때 preLoad() 함수를 호출
  useEffect(() => {
    preLoad();
  }, []);

  const logUserIn = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const logUserOut = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'false'); // only string
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  return client && loaded ? (
    <ApolloProvider client={client}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {isLoggedIn === true ? (
          <TouchableOpacity onPress={logUserOut}>
            <Text>Log Out</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={logUserIn}>
            <Text>Log In</Text>
          </TouchableOpacity>
        )}
      </View>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}
