import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import TabNavigation from './TabNavigation';
import NewPost from '../screens/Tabs/NewPost';

const MainNavigation = createStackNavigator(
  {
    TabNavigation: {
      screen: TabNavigation,
      navigationOptions: {
        headerShown: false,
      },
    },
    NewPost: {
      screen: NewPost,
      navigationOptions: {
        title: '글쓰기',
      },
    },
  },
  {
    headerMode: 'float',
  }
);

export default createAppContainer(MainNavigation);
