import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DeviceInfo from 'react-native-device-info';
import { IconButton } from 'react-native-paper';
import { navigationRef } from './NavigationService';
import Login from 'app/screens/Login';
import LoginScreen from 'app/screens/Auth/Login';
import RegisterScreen from 'app/screens/Auth/Register';
import AuthLoadingScreen from 'app/screens/Auth/Loading';
import StartScreen from 'app/screens/Auth/Start';
import ProgramDetail from 'app/screens/ProgramDetail';
import Tabs from './Tabs';

const Stack = createStackNavigator();

function App() {
  const stackProps = DeviceInfo.isTablet()
    ? { headerMode: 'none' }
    : { headerMode: 'none' };

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        {...stackProps}
        screenOptions={{
          headerStyle: {
            backgroundColor: '##fff',
            borderBottomWidth: StyleSheet.hairlineWidth,
          },
          headerTintColor: '#2c3e50',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitleVisible: false,
        }}>
        <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
        {/* <Stack.Screen name="Login" component={Login} /> */}
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen
          name="Home"
          component={Tabs}
          options={{
            headerLeft: null,
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <IconButton
                  icon="settings"
                  color="#bdc3c7"
                  size={20}
                  onPress={() => {}}
                />
                <IconButton
                  icon="bell"
                  color="#bdc3c7"
                  size={20}
                  onPress={() => {}}
                />
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="ProgramDetail"
          component={ProgramDetail}
          options={{ title: 'Thông tin chương trình học' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
