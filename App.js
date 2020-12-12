import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Ionicons } from '@expo/vector-icons';

import { ApolloClient } from 'apollo-client';
//import  ApolloClient  from "apollo-boost";
import { persistCache } from 'apollo-cache-persist';
//import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from 'react-apollo-hooks';
//import { ApolloProvider } from "@apollo/react-hooks";

import { cache, options } from './apollo';

import { AuthProvider } from './AuthContext';
import NavController from './components/NavController';
import Toast from 'react-native-toast-message';

export default function App() {
  console.disableYellowBox = true;

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
      //const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage,
      });

      // 아폴로 클라이언트 생성
      const client = new ApolloClient({
        /*request: async (operation) => {
          // 요청할 때 마다 이 함수가 실행된다
          const token = await AsyncStorage.getItem("jwt");
          return operation.setContext({
            headers: { Authorization: `Bearer ${token}` },
          });
        },
        ...apolloClientOptions,
        cache*/
        ...options,
      });
      setClient(client);
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (!isLoggedIn || isLoggedIn === 'false') {
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

  return client && loaded && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <AuthProvider isLoggedIn={isLoggedIn}>
        <NavController />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </AuthProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}
