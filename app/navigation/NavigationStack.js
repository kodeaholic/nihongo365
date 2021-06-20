import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DeviceInfo from 'react-native-device-info';
import { IconButton } from 'react-native-paper';
import { navigationRef } from './NavigationService';
import LoginScreen from 'app/screens/Auth/Login';
import RegisterScreen from 'app/screens/Auth/Register';
import AuthLoadingScreen from 'app/screens/Auth/Loading';
import StartScreen from 'app/screens/Auth/Start';
import VocabProgramGuideline from '../screens/ProgramGuideline/Vocab';
import ChuHanProgramGuideline from '../screens/ProgramGuideline/ChuHan';
import { VocabTopicSelection } from '../screens/VocabTopicSelection';
import Tabs from './Tabs';
const Stack = createStackNavigator();

function App() {
  const stackProps = DeviceInfo.isTablet()
    ? { headerMode: 'none' }
    : { headerMode: 'none' };

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator {...stackProps}>
        <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
        {/* <Stack.Screen name="Login" component={Login} /> */}
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen
          name="VocabProgramGuideline"
          component={VocabProgramGuideline}
          options={{ title: 'Thông tin chương trình học' }}
        />
        <Stack.Screen
          name="ChuHanProgramGuideline"
          component={ChuHanProgramGuideline}
          options={{ title: 'Thông tin chương trình học' }}
        />
        <Stack.Screen
          name="VocabTopicSelection"
          component={VocabTopicSelection}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
