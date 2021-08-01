/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
export default function Dictionary() {
  const navigation = useNavigation();
  useEffect(() => {
    console.log('Mounted');
    navigation.setOptions({ title: 'Từ điển' });
  }, [navigation]);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        style={{ textAlignVertical: 'center', textAlign: 'center', margin: 5 }}>
        Từ điển Nihongo - Tính năng đang được phát triển
      </Text>
      <Text
        style={{ textAlignVertical: 'center', margin: 5, textAlign: 'center' }}>
        Cho phép bạn tra cứu chi tiết cách viết, giải nghĩa, ví dụ từng chữ
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  text: {
    flex: 1,
    margin: 8,
  },
});
