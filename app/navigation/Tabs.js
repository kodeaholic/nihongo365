import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeArea } from 'react-native-safe-area-context';
import { Portal, FAB } from 'react-native-paper';
import DeviceInfo from 'react-native-device-info';

import Programs from 'app/screens/Programs';
import Departments from 'app/screens/Departments';
import Patients from 'app/screens/Patients';
import Reports from 'app/screens/Reports';

import TabBar from 'app/components/tab-bar';

const isTablet = DeviceInfo.isTablet();
const Tab = isTablet
  ? createMaterialTopTabNavigator()
  : createMaterialBottomTabNavigator();

function Tabs() {
  const isFocused = useIsFocused();
  const safeArea = useSafeArea();
  let tabBarProps = {};

  if (isTablet) {
    tabBarProps = {
      tabBar: props => <TabBar {...props} />,
    };
  }

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
          component={Patients}
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
