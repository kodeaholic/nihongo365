/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeArea } from 'react-native-safe-area-context';
import { Portal, FAB } from 'react-native-paper';
import DeviceInfo from 'react-native-device-info';

import Programs from '../screens/Programs';
import Dictionary from '../screens/Dictionary';

import TabBar from 'app/components/tab-bar';

const isTablet = DeviceInfo.isTablet();
const Tab = isTablet
  ? createMaterialTopTabNavigator()
  : createMaterialBottomTabNavigator();

function Tabs({ navigation }) {
  const isFocused = useIsFocused();
  const safeArea = useSafeArea();
  let tabBarProps = {};

  if (isTablet) {
    tabBarProps = {
      tabBar: props => <TabBar {...props} />,
    };
  }
  React.useEffect(() => {
    navigation.setOptions({
      headerProps: {
        title: 'Nihongo365',
        enableLogoutButton: true,
        center: true,
      },
    });
  });
  return (
    <React.Fragment>
      <Tab.Navigator
        initialRouteName="Feed"
        shifting={true}
        labeled={true}
        sceneAnimationEnabled={false}
        activeColor="#00aea2"
        inactiveColor="#95a5a6"
        barStyle={{ backgroundColor: '#ffff' }}
        {...tabBarProps}
        tabBarOptions={{ showLabel: true, labelPosition: 'below-icon' }}>
        <Tab.Screen
          name="Học"
          component={Programs}
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
          component={Dictionary}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="magnify" color={color} size={26} />
            ),
          }}
        />
        {/* <Tab.Screen
          name="Departments"
          component={Departments}
          options={{
            tabBarIcon: 'layers',
          }}
        />
        <Tab.Screen
          name="Reports"
          component={Reports}
          options={{
            tabBarIcon: 'book-open',
          }}
        /> */}
      </Tab.Navigator>
      {/* <Portal>
        <FAB
          visible={isFocused} // show FAB only when this screen is focused
          icon="plus-box"
          label={isTablet ? 'Create new' : null}
          style={[
            styles.fab,
            {
              bottom: safeArea.bottom + 65,
            },
          ]}
        />
      </Portal> */}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 16,
  },
});

export default Tabs;
