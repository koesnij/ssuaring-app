import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigation from './TabNavigation';
import NewPost from '../screens/Tabs/NewPost';

const Stack = createStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator headerMode={'float'}>
      <Stack.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="NewPost" component={NewPost} />
    </Stack.Navigator>
  </NavigationContainer>
);
