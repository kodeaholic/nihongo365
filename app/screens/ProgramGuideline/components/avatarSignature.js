import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

export function AvatarSignature() {
  return (
    <View style={styles.bottomSignature}>
      <Text style={styles.text}>Chúc bạn sớm nhớ nhanh chữ Hán!</Text>
      <Avatar.Image
        size={86}
        style={{ marginTop: 0, marginBottom: 10, marginLeft: 10 }}
        source={require('app/assets/logo.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bottomSignature: {
    // flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    fontSize: 16,
    fontFamily: 'SF-Pro-Display-Regular',
    marginBottom: 10,
  },
});
