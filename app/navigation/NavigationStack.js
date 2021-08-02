/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
// import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DeviceInfo from 'react-native-device-info';
// import { IconButton } from 'react-native-paper';
import { navigationRef } from './NavigationService';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import LoginScreen from 'app/screens/Auth/Login';
// import RegisterScreen from 'app/screens/Auth/Register';
import AuthLoadingScreen from '../screens/Auth/Loading';
import StartScreen from '../screens/Auth/Start';
import VocabProgramGuideline from '../screens/ProgramGuideline/Vocab';
import ChuHanProgramGuideline from '../screens/ProgramGuideline/ChuHan';
import { VocabTopicSelection } from '../screens/VocabTopicSelection';
import { ChuHanBoardSelection } from '../screens/ChuHanBoardSelection';
import { ListeningLessonSelection } from '../screens/ListeningLessonSelection';
import { VocabLesson } from '../screens/VocabLesson';
import { ChuHanLesson } from '../screens/ChuHanLesson';
import { ChuHanView } from '../screens/ChuHanLesson/webview';
import { ListeningLesson } from '../screens/ListeningLesson';
import { DialogLessonSelection } from '../screens/DialogLessonSelection';
import { DialogLesson } from '../screens/DialogLesson';
import { ReadingLessonSelection } from '../screens/ReadingLessonSelection';
import { ReadingLesson } from '../screens/ReadingLesson/index';
// import Tabs from './Tabs';
import { Header } from '../components/navigatorHeader';
// import _ from 'lodash';
import Dictionary from '../screens/Dictionary';
import Programs from '../screens/Programs';
import TabBar from 'app/components/tab-bar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const LearnStack = createStackNavigator();
function LearnStackScreen() {
  const stackProps = DeviceInfo.isTablet()
    ? { headerMode: 'none' }
    : { headerMode: 'float' };
  return (
    <LearnStack.Navigator
      {...stackProps}
      screenOptions={{
        header: ({ scene }) => {
          let { headerProps } = scene.descriptor.options;
          return <Header {...headerProps} />;
        },
      }}>
      <LearnStack.Screen name="Learn" component={Programs} />
      <LearnStack.Screen
        name="VocabProgramGuideline"
        component={VocabProgramGuideline}
        options={{ title: 'Thông tin chương trình học' }}
      />
      <LearnStack.Screen
        name="ChuHanProgramGuideline"
        component={ChuHanProgramGuideline}
        options={{ title: 'Thông tin chương trình học' }}
      />
      <LearnStack.Screen
        name="VocabTopicSelection"
        component={VocabTopicSelection}
      />
      <LearnStack.Screen name="VocabLesson" component={VocabLesson} />
      <LearnStack.Screen
        name="ChuHanBoardSelection"
        component={ChuHanBoardSelection}
      />
      <LearnStack.Screen name="ChuHanLesson" component={ChuHanLesson} />
      <LearnStack.Screen name="ChuHanView" component={ChuHanView} />
      <LearnStack.Screen
        name="ListeningLessonSelection"
        component={ListeningLessonSelection}
      />
      <LearnStack.Screen name="ListeningLesson" component={ListeningLesson} />
      <LearnStack.Screen
        name="DialogLessonSelection"
        component={DialogLessonSelection}
      />
      <LearnStack.Screen name="DialogLesson" component={DialogLesson} />
      <LearnStack.Screen
        name="ReadingLessonSelection"
        component={ReadingLessonSelection}
      />
      <LearnStack.Screen name="ReadingLesson" component={ReadingLesson} />
    </LearnStack.Navigator>
  );
}

const DictionaryStack = createStackNavigator();
function DictionaryStackScreen() {
  const stackProps = DeviceInfo.isTablet()
    ? { headerMode: 'none' }
    : { headerMode: 'float' };
  return (
    <DictionaryStack.Navigator
      {...stackProps}
      screenOptions={{
        header: ({ scene }) => {
          let { headerProps } = scene.descriptor.options;
          return <Header {...headerProps} />;
        },
      }}>
      <DictionaryStack.Screen name="Dictionary" component={Dictionary} />
    </DictionaryStack.Navigator>
  );
}
const Tab = DeviceInfo.isTablet()
  ? createMaterialTopTabNavigator()
  : createMaterialBottomTabNavigator();
let tabBarProps;
if (DeviceInfo.isTablet()) {
  tabBarProps = {
    tabBar: props => <TabBar {...props} />,
  };
}

function MainStackScreen() {
  return (
    <React.Fragment>
      <Tab.Navigator
        shifting={true}
        labeled={true}
        sceneAnimationEnabled={false}
        activeColor="#00aea2"
        inactiveColor="#95a5a6"
        barStyle={{ backgroundColor: '#ffff' }}
        {...tabBarProps}
        tabBarOptions={{ showLabel: true, labelPosition: 'below-icon' }}>
        <Tab.Screen
          component={LearnStackScreen}
          name="Học"
          options={{
            showIcon: true,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="clipboard-list-outline"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Từ điển"
          component={DictionaryStackScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="google-translate"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </React.Fragment>
  );
}

const AppStack = createStackNavigator();

function App() {
  const stackProps = DeviceInfo.isTablet()
    ? { headerMode: 'none' }
    : { headerMode: 'none' };
  return (
    <NavigationContainer ref={navigationRef}>
      <AppStack.Navigator
        {...stackProps}
        screenOptions={{
          headerShown: false,
        }}>
        <AppStack.Screen name="AuthLoading" component={AuthLoadingScreen} />
        <AppStack.Screen name="StartScreen" component={StartScreen} />
        {/* <AppStack.Screen name="LoginScreen" component={LoginScreen} />
        <AppStack.Screen name="RegisterScreen" component={RegisterScreen} /> */}
        <AppStack.Screen name="Main" component={MainStackScreen} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
