import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import styles from '../styles';
import TabNavigation from './TabNavigation';
import NewPost from '../screens/Tabs/NewPost';

const Stack = createStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator
      headerMode={'float'}
      screenOptions={{
        headerBackTitle: ' ',
        headerTintColor: styles.blackColor,
      }}
    >
      <Stack.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewPost"
        component={NewPost}
        options={{ title: '글쓰기' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
