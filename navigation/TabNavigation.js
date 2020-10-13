import { View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Home from '../screens/Tabs/Home';
import Search from '../screens/Tabs/Search';
import Chats from '../screens/Tabs/Chats';
import Mypage from '../screens/Tabs/Mypage';

const TabNavigation = createBottomTabNavigator({
  Home,
  Search,
  Add: {
    screen: View,
    navigationOptions: {
      tabBarOnPress: () => {
        console.log('Add');
      },
    },
  },
  Chats,
  Mypage,
});
export default createAppContainer(TabNavigation);
