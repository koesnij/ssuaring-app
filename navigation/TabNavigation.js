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
import styles from '../styles';
import MyProfile from '../screens/Tabs/Mypage/MyPageScreens/MyProfile';
import MyLikes from '../screens/Tabs/Mypage/MyPageScreens/MyLikes';
import MyArea from '../screens/Tabs/Mypage/MyPageScreens/MyArea';
import MyPosts from '../screens/Tabs/Mypage/MyPageScreens/MyPosts';
import MyReviews from '../screens/Tabs/Mypage/MyPageScreens/MyReviews';
import EditProfile from '../screens/Tabs/Mypage/MyPageScreens/EditProfile';
import MyTradeHistory from '../screens/Tabs/Mypage/MyPageScreens/MyTradeHistory';
import Setting from '../screens/Tabs/Mypage/MyPageScreens/Setting';
import SearchPage from '../screens/Tabs/Search/SearchPageScreens/SearchPage';
import Chatting from '../screens/Tabs/Chats/ChatsScreens/Chatting';
import PostDetail from '../screens/Tabs/PostDetail';
import ReservationReq from '../screens/Tabs/ReservationReq';
import EditArea from '../screens/Tabs/Mypage/MyPageScreens/EditArea';
import Report from '../screens/Report/Report';
import PostEditDetail from '../screens/Tabs/Mypage/MyPageScreens/PostEditDetail';
import EditPost from '../screens/Tabs/Mypage/MyPageScreens/EditPost';
import EditPostTest from '../screens/Tabs/Mypage/MyPageScreens/EditPostTest';
import MyReservation from '../screens/Tabs/Mypage/MyPageScreens/MyReservation';
import MyReservationDetail from '../screens/Tabs/Mypage/MyPageScreens/MyReservationDetail';
const HomeStack = createStackNavigator();
const MyPageStack = createStackNavigator();
const SearchStack = createStackNavigator();
const ChatStack = createStackNavigator();

const HomeStackScreen = ({ navigation, route }) => {
  if (route.state && route.state.index > 0) {
    navigation.setOptions({ tabBarVisible: false });
  } else {
    navigation.setOptions({ tabBarVisible: true });
  }
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerBackTitle: ' ',
        headerTintColor: styles.blackColor,
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{ title: '홈' }}
      />
      <HomeStack.Screen
        name="Filter"
        component={Filter}
        options={{ title: '필터' }}
      />
      <HomeStack.Screen
        name="PostDetail"
        component={PostDetail}
        options={{ title: '게시물 상세' }}
      />
      <HomeStack.Screen
        name="ReservationReq"
        component={ReservationReq}
        options={{ title: '예약 신청' }}
      />
      <HomeStack.Screen
        name="Report"
        component={Report}
        options={{ title: '신고하기' }}
      />
      <HomeStack.Screen
        name="UserProfile"
        component={MyProfile}
        options={{ title: '프로필' }}
      />
      <HomeStack.Screen
        name="EditPostTest"
        component={EditPostTest}
        options={{ title: '게시물 수정' }}
      />
      <HomeStack.Screen
        name="Chatting"
        component={Chatting}
        options={{ title: '채팅화면' }}
      />
    </HomeStack.Navigator>
  );
};

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
  if (route.state && route.state.index > 0) {
    navigation.setOptions({ tabBarVisible: false });
  } else {
    navigation.setOptions({ tabBarVisible: true });
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

const MyPageStackScreen = ({ navigation, route }) => {
  if (route.state && route.state.index > 1) {
    navigation.setOptions({ tabBarVisible: false });
  } else {
    navigation.setOptions({ tabBarVisible: true });
  }
  return (
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
        name="MyArea"
        component={MyArea}
        options={{ title: '내 지역' }}
      />
      <MyPageStack.Screen
        name="MyPosts"
        component={MyPosts}
        options={{ title: '내 게시물' }}
      />
      <MyPageStack.Screen
        name="EditArea"
        component={EditArea}
        options={{ title: '지역 변경하기' }}
      />
      <MyPageStack.Screen
        name="MyTradeHistory"
        component={MyTradeHistory}
        options={{ title: '내 거래내역' }}
      />
      <MyPageStack.Screen
        name="MyReservation"
        component={MyReservation}
        options={{ title: '내게 온 대여신청' }}
      />
      <MyPageStack.Screen
        name="MyReservationDetail"
        component={MyReservationDetail}
        options={{ title: '내게 온 신청' }}
      />
      <MyPageStack.Screen
        name="Setting"
        component={Setting}
        options={{ title: '설정' }}
      />
      <MyPageStack.Screen
        name="MyReviews"
        component={MyReviews}
        options={{ title: '리뷰' }}
      />
      <MyPageStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ title: '프로필 수정' }}
      />
      <MyPageStack.Screen
        name="Report"
        component={Report}
        options={{ title: '신고하기' }}
      />
      <MyPageStack.Screen
        name="EditPostTest"
        component={EditPostTest}
        options={{ title: '게시물 수정' }}
      />
      <MyPageStack.Screen
        name="PostDetail"
        component={PostDetail}
        options={{ title: '게시물 상세 정보' }}
      />
    </MyPageStack.Navigator>
  );
};
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
