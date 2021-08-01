/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import Skeleton from '@thevsstech/react-native-skeleton';
export default function Dictionary() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerProps: { title: 'Từ điển' } });
  }, [navigation]);
  return (
    <Skeleton>
      <Skeleton.Item flexDirection="row" alignItems="center">
        <Skeleton.Item width={60} height={60} borderRadius={50} />
        <Skeleton.Item marginLeft={20}>
          <Skeleton.Item width={120} height={20} borderRadius={4} />
          <Skeleton.Item
            marginTop={6}
            width={80}
            height={20}
            borderRadius={4}
          />
        </Skeleton.Item>
      </Skeleton.Item>
    </Skeleton>
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
