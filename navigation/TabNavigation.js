import React from 'react';
import { View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Home from '../screens/Tabs/Home';
import Search from '../screens/Tabs/Search';
import Chats from '../screens/Tabs/Chats';
import Mypage from '../screens/Tabs/Mypage';
import TabIcon from '../components/TabIcon';
import Filter from '../screens/Tabs/Home/Filter';
import Map from '../screens/Tabs/Home/Map';
import styles from '../styles';
import { Header, HeaderLink } from '../components/HeaderItem';

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator(
    {
      initialRoute: {
        screen: initialRoute,
        navigationOptions: {
          ...customConfig,
        },
      },
      Filter: {
        screen: Filter,
        navigationOptions: {
          title: '필터',
        },
      },
      Map: {
        screen: Map,
        navigationOptions: {
          title: '지도',
        },
      },
    },
    {
      navigationOptions: ({ navigation }) => {
        let tabBarVisible = true;
        if (navigation.state.index > 0) {
          tabBarVisible = false;
        }
        return {
          tabBarVisible,
        };
      },
      defaultNavigationOptions: {
        headerBackTitle: ' ',
        headerTintColor: styles.blackColor,
      },
    }
  );

const TabNavigation = createBottomTabNavigator(
  {
    Home: {
      screen: stackFactory(Home, {
        title: '동작구',
        headerRight: () => {
          return (
            <Header style={{ flexDirection: 'row' }}>
              <HeaderLink str={'필터'} to={'Filter'} />
              <HeaderLink str={'지도'} to={'Map'} />
            </Header>
          );
        },
      }),
      navigationOptions: {
        title: '홈',

        tabBarIcon: ({ focused }) => (
          <TabIcon name={'home'} focused={focused} />
        ),
      },
    },
    Search: {
      screen: Search,
      navigationOptions: {
        title: '검색',
        tabBarIcon: ({ focused }) => (
          <TabIcon name={'search'} focused={focused} />
        ),
      },
    },
    Add: {
      screen: View,
      navigationOptions: {
        title: '글쓰기',
        tabBarOnPress: ({ navigation }) => {
          navigation.navigate('NewPost');
        },
        tabBarIcon: ({ focused }) => <TabIcon name={'add-circle-outline'} />,
      },
    },
    Chats: {
      screen: Chats,
      navigationOptions: {
        title: '채팅',
        tabBarIcon: ({ focused }) => (
          <TabIcon name={'chatbubbles'} focused={focused} />
        ),
      },
    },
    Mypage: {
      screen: Mypage,
      navigationOptions: {
        title: '마이',
        tabBarIcon: ({ focused }) => (
          <TabIcon name={'person'} focused={focused} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: `${styles.blueColor}`,
      inactiveTintColor: `${styles.blackColor}`,
    },
  }
);
export default createAppContainer(TabNavigation);
