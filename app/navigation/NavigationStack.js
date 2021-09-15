/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
// import { StyleSheet, View } from 'react-native';
// import messaging from '@react-native-firebase/messaging';
import { Platform, View } from 'react-native';
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
import { VocabProgramGuideline } from '../screens/ProgramGuideline/Vocab';
import { ChuHanProgramGuideline } from '../screens/ProgramGuideline/ChuHan';
import { DialogProgramGuideline } from '../screens/ProgramGuideline/HoiThoai';
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
import { SubTestSelection } from '../screens/SubTestSelection';
import { SubTest } from '../screens/SubTest';
import { TrialTestSelection } from '../screens/TrialTestSelection';
import { TrialTest } from '../screens/TrialTest';
import { GrammarSelection } from '../screens/GrammarSelection';
import { Grammar } from '../screens/Grammar';
import Alphabet from '../screens/Alphabet';
import News from '../screens/News';
import { More } from '../screens/More';
import _ from 'lodash';
import { NewsDetail } from '../screens/News/detail';
import { Chat } from '../screens/Chat';
import Rooms from '../screens/ChatRoom';
import { Services } from '../screens/More/services';
import { AdminServices } from '../screens/More/admin/services';
import { Room } from '../screens/ChatRoom/room';
import { ListeningProgramGuideline } from '../screens/ProgramGuideline/Listening';
import { GrammarProgramGuideline } from '../screens/ProgramGuideline/Grammar';
import { ReadingProgramGuideline } from '../screens/ProgramGuideline/Reading';
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
          headerProps = { ...headerProps, enableLogoutButton: false };
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
        name="DialogProgramGuideline"
        component={DialogProgramGuideline}
        options={{ title: 'Thông tin chương trình học' }}
      />
      <LearnStack.Screen
        name="ListeningProgramGuideline"
        component={ListeningProgramGuideline}
        options={{ title: 'Thông tin chương trình học' }}
      />
      <LearnStack.Screen
        name="GrammarProgramGuideline"
        component={GrammarProgramGuideline}
        options={{ title: 'Thông tin chương trình học' }}
      />
      <LearnStack.Screen
        name="ReadingProgramGuideline"
        component={ReadingProgramGuideline}
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
      <LearnStack.Screen name="SubTestSelection" component={SubTestSelection} />
      <LearnStack.Screen name="SubTest" component={SubTest} />
      <LearnStack.Screen
        name="TrialTestSelection"
        component={TrialTestSelection}
      />
      <LearnStack.Screen name="TrialTest" component={TrialTest} />
      <LearnStack.Screen name="GrammarSelection" component={GrammarSelection} />
      <LearnStack.Screen name="Grammar" component={Grammar} />
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
          if (_.isEmpty(headerProps)) {
            headerProps = {};
          }
          headerProps = { ...headerProps, enableLogoutButton: false };
          Object.assign(headerProps, { disableBackButton: true });
          return <Header {...headerProps} />;
        },
      }}>
      <DictionaryStack.Screen name="Dictionary" component={Dictionary} />
    </DictionaryStack.Navigator>
  );
}

const NewsStack = createStackNavigator();
function NewsStackScreen() {
  const stackProps = DeviceInfo.isTablet()
    ? { headerMode: 'none' }
    : { headerMode: 'float' };
  return (
    <NewsStack.Navigator
      {...stackProps}
      screenOptions={{
        header: ({ scene }) => {
          let { headerProps } = scene.descriptor.options;
          if (_.isEmpty(headerProps)) {
            headerProps = {};
          }
          headerProps = { ...headerProps, enableLogoutButton: false };
          // Object.assign(headerProps, { disableBackButton: true });
          return <Header {...headerProps} />;
        },
      }}>
      <NewsStack.Screen name="News" component={News} />
      <NewsStack.Screen name="NewsDetail" component={NewsDetail} />
    </NewsStack.Navigator>
  );
}

const MoreStack = createStackNavigator();
function MoreStackScreen() {
  const stackProps = DeviceInfo.isTablet()
    ? { headerMode: 'none' }
    : { headerMode: 'float' };
  return (
    <MoreStack.Navigator
      {...stackProps}
      screenOptions={{
        header: ({ scene }) => {
          let { headerProps } = scene.descriptor.options;
          if (_.isEmpty(headerProps)) {
            headerProps = {};
          }
          Object.assign(headerProps, {
            disableBackButton: true,
            // renderCenterImage: true,
            enableLogoutButton: false,
            screen: 'MORE',
          });
          return <Header {...headerProps} />;
        },
      }}>
      <MoreStack.Screen name="More" component={More} />
      <MoreStack.Screen name="Services" component={Services} />
      <MoreStack.Screen name="AdminServices" component={AdminServices} />
    </MoreStack.Navigator>
  );
}

const AlphabetStack = createStackNavigator();
function AlphabetStackScreen() {
  const stackProps = DeviceInfo.isTablet()
    ? { headerMode: 'none' }
    : { headerMode: 'float' };
  return (
    <AlphabetStack.Navigator
      {...stackProps}
      screenOptions={{
        header: ({ scene }) => {
          let { headerProps } = scene.descriptor.options;
          if (_.isEmpty(headerProps)) {
            headerProps = {};
          }
          headerProps = { ...headerProps, enableLogoutButton: false };
          Object.assign(headerProps, { disableBackButton: true });
          return <Header {...headerProps} />;
        },
      }}>
      <AlphabetStack.Screen name="Alphabet" component={Alphabet} />
    </AlphabetStack.Navigator>
  );
}

const ChatStack = createStackNavigator();
function ChatStackScreen() {
  const stackProps = DeviceInfo.isTablet()
    ? { headerMode: 'none' }
    : { headerMode: 'float' };
  return (
    <ChatStack.Navigator
      {...stackProps}
      screenOptions={{
        header: ({ scene }) => {
          let { headerProps } = scene.descriptor.options;
          if (_.isEmpty(headerProps)) {
            headerProps = {};
          }
          Object.assign(headerProps, {
            disableBackButton: true,
            //leftAction: undefined,
            enableLogoutButton: false,
            centerTitle: true,
          });
          return <Header {...headerProps} />;
        },
      }}>
      <ChatStack.Screen name="ChatRooms" component={Rooms} />
      <ChatStack.Screen name="Chat" component={Chat} />
      <ChatStack.Screen name="Room" component={Room} />
    </ChatStack.Navigator>
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
  // React.useEffect(() => {
  //   // console.log(Date.now());
  //   (async () => {
  //     if (Platform.OS === 'android') {
  //       const authStatus = await messaging().requestPermission();
  //       const enabled =
  //         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //       if (enabled) {
  //         // console.log('Authorization status:', authStatus);
  //       }
  //     }
  //   })();
  // }, []);
  return (
    <React.Fragment>
      <Tab.Navigator
        shifting={false}
        labeled={true}
        sceneAnimationEnabled={true}
        activeColor="#00aea2"
        inactiveColor="#95a5a6"
        barStyle={{ backgroundColor: '#fff', height: 56 }}
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
            showIcon: true,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="google-translate"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatStackScreen}
          options={{
            showIcon: true,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="chat-outline"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Bài viết"
          component={NewsStackScreen}
          options={{
            showIcon: true,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="newspaper-variant-outline"
                color={color}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Bảng chữ"
          component={AlphabetStackScreen}
          options={{
            showIcon: true,
            tabBarIcon: ({ color }) => (
              <>
                <View style={{ flexDirection: 'row' }}>
                  <MaterialCommunityIcons
                    name="syllabary-hiragana"
                    color={color}
                    size={24}
                    style={{ paddingRight: 0 }}
                  />
                  <MaterialCommunityIcons
                    name="syllabary-katakana"
                    color={color}
                    size={24}
                    style={{ paddingLeft: 0 }}
                  />
                </View>
              </>
            ),
          }}
        />

        <Tab.Screen
          name="Cá nhân"
          component={MoreStackScreen}
          options={{
            showIcon: true,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account-circle-outline"
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
