import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Tabs/Home';
import Search from '../screens/Tabs/Search';
import Chats from '../screens/Tabs/Chats';
import Mypage from '../screens/Tabs/Mypage';
import TabIcon from '../components/TabIcon';
import Filter from '../screens/Tabs/Home/Filter';
import Map from '../screens/Tabs/Home/Map';
import PostDetail from '../screens/Tabs/PostDetail';
import styles from '../styles';

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerBackTitle: ' ',
      headerTintColor: styles.blackColor,
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={Home}
      options={{ title: '내 지역a',
       headerTitle: '동작구', }}
    />
    <HomeStack.Screen
      name="Filter"
      component={Filter}
      options={{ title: '필터' }}
    />

      <HomeStack.Screen
      name="PostDetail"
      component={PostDetail}
      options={{ title: '대여 상세 정보' }}
    />
    <HomeStack.Screen name="Map" component={Map} options={{ title: '지도' }} />
  </HomeStack.Navigator>
);

const Tab = createBottomTabNavigator();

export default ({ navigation }) => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: `${styles.blueColor}`,
      inactiveTintColor: `${styles.blackColor}`,
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: '홈',
        tabBarIcon: ({ focused }) => <TabIcon name="home" focused={focused} />,
      }}
    />
    <Tab.Screen
      name="Search"
      component={Search}
      options={{
        tabBarLabel: '검색',
        tabBarIcon: ({ focused }) => (
          <TabIcon name="search" focused={focused} />
        ),
      }}
    />
    <Tab.Screen
      name="Add"
      component={View}
      options={{
        tabBarLabel: '글쓰기',
        tabBarIcon: ({ focused }) => (
          <TabIcon name="add-circle-outline" focused={focused} />
        ),
      }}
      listeners={{
        tabPress: (e) => {
          e.preventDefault();
          navigation.navigate('NewPost');
        },
      }}
    />
    <Tab.Screen
      name="Chats"
      component={Chats}
      options={{
        tabBarLabel: '채팅',
        tabBarIcon: ({ focused }) => (
          <TabIcon name="chatbubbles" focused={focused} />
        ),
      }}
    />
    <Tab.Screen
      name="Mypage"
      component={Mypage}
      options={{
        tabBarLabel: '마이',
        tabBarIcon: ({ focused }) => (
          <TabIcon name="person" focused={focused} />
        ),
      }}
    />
  </Tab.Navigator>
);
