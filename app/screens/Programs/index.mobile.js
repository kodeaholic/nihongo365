import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { Title } from 'react-native-paper';

import { useSelector } from 'react-redux';

import Item from './components/item';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
export default function Programs() {
  const [navigation] = useState(useNavigation());
  useEffect(() => {
    navigation.setOptions({ headerProps: { title: 'Học' } });
  }, [navigation]);
  const programs = useSelector(state => state.programReducer.programs);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        data={programs}
        renderItem={({ item }) => <Item item={item} />}
        renderSectionHeader={({ section: { key } }) => <Title>{key}</Title>}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}
