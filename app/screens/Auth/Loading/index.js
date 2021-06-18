import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    const navigateHome = {
      index: 0,
      routes: [{ name: 'Home' }],
    };
    const navigateStartScreen = {
      index: 0,
      routes: [{ name: 'StartScreen' }],
    };
    const target = userToken ? navigateHome : navigateStartScreen;
    this.props.navigation.reset(target);
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" />
        {/* <StatusBar barStyle="default" /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default AuthLoadingScreen;
