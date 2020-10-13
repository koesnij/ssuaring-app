import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from '../screens/Auth/Login';
import Confirm from '../screens/Auth/Confirm';
import SignUp from '../screens/Auth/SignUp';

const AuthNavigation = createStackNavigator(
  {
    Login,
    Confirm,
    SignUp,
  },
  { initialRouteName: 'Login', headerMode: 'none' }
);

export default createAppContainer(AuthNavigation);
