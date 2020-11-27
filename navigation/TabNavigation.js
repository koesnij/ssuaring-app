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
import ReservationReq from '../screens/Tabs/ReservationReq';
import styles from '../styles';
import MyProfile from '../screens/Tabs/Mypage/MyPageScreens/MyProfile';
import MyLikes from '../screens/Tabs/Mypage/MyPageScreens/MyLikes';
import MyPosts from '../screens/Tabs/Mypage/MyPageScreens/MyPosts';
import EditProfile from '../screens/Tabs/Mypage/MyPageScreens/EditProfile';
import MyTradeHistory from '../screens/Tabs/Mypage/MyPageScreens/MyTradeHistory';
import Setting from '../screens/Tabs/Mypage/MyPageScreens/Setting';
import SearchPage from '../screens/Tabs/Search/SearchPageScreens/SearchPage';
import Chatting from '../screens/Tabs/Chats/ChatsScreens/Chatting';
const HomeStack = createStackNavigator();
const MyPageStack = createStackNavigator();
const SearchStack = createStackNavigator();
const ChatStack = createStackNavigator();

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
      options={{ title: '내 지역a', headerTitle: '동작구' }}
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

    <HomeStack.Screen
      name="ReservationReq"
      component={ReservationReq}
      options={{ title: '예약 신청' }}
    />

    <HomeStack.Screen name="Map" component={Map} options={{ title: '지도' }} />
  </HomeStack.Navigator>
);
const SearchStackScreen = () => (
  <SearchStack.Navigator
    screenOptions={{
      headerBackTitle: ' ',
      headerTintColor: styles.blackColor,
    }}
  >
    <SearchStack.Screen
      name="Search"
      component={Search}
      options={{ title: '' }}
    />
    <SearchStack.Screen
      name="SearchPage"
      component={SearchPage}
      options={{ title: '검색 결과' }}
    />
  </SearchStack.Navigator>
);

const ChatStackScreen = ({ navigation, route }) => {
  if(route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible: false})
  } else {
    navigation.setOptions({tabBarVisible: true})
  }
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="Chats"
        component={Chats}
        options={{ title: '채팅방' }}
      />
      <ChatStack.Screen
        name="Chatting"
        component={Chatting}
        options={{ title: '채팅화면' }}
      />
    </ChatStack.Navigator>
  );
};

const MyPageStackScreen = () => (
  <MyPageStack.Navigator
    screenOptions={{
      headerBackTitle: ' ',
      headerTintColor: styles.blackColor,
    }}
  >
    <MyPageStack.Screen
      name="MyPage"
      component={Mypage}
      options={{ title: '내 정보' }}
    />
    <MyPageStack.Screen
      name="MyProfile"
      component={MyProfile}
      options={{ title: '프로필' }}
    />
    <MyPageStack.Screen
      name="MyLikes"
      component={MyLikes}
      options={{ title: '찜 목록' }}
    />
    <MyPageStack.Screen
      name="MyPosts"
      component={MyPosts}
      options={{ title: '내 게시물' }}
    />
    <MyPageStack.Screen
      name="MyTradeHistory"
      component={MyTradeHistory}
      options={{ title: '내 거래내역' }}
    />
    <MyPageStack.Screen
      name="Setting"
      component={Setting}
      options={{ title: '설정' }}
    />
    <MyPageStack.Screen
      name="EditProfile"
      component={EditProfile}
      options={{ title: '프로필 수정' }}
    />
  </MyPageStack.Navigator>
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
      component={SearchStackScreen}
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
      component={ChatStackScreen}
      options={{
        tabBarLabel: '채팅',
        tabBarIcon: ({ focused }) => (
          <TabIcon name="chatbubbles" focused={focused} />
        ),
      }}
    />
    <Tab.Screen
      name="Mypage"
      component={MyPageStackScreen}
      options={{
        tabBarLabel: '마이',
        tabBarIcon: ({ focused }) => (
          <TabIcon name="person" focused={focused} />
        ),
      }}
    />
  </Tab.Navigator>
);
