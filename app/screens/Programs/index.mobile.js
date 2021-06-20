import React from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { Headline, Title } from 'react-native-paper';

import { useSelector } from 'react-redux';
import moment from 'moment';

import Item from './components/item';
import styles from './styles';

export default function Programs() {
  const programs = useSelector(state => state.programReducer.programs);

  const localData = [...programs];
  // Sort data by datetime
  localData.sort((a, b) => {
    return moment(a.date).unix() - moment(b.date).unix();
  });

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        data={localData}
        renderItem={({ item }) => <Item item={item} />}
        renderSectionHeader={({ section: { key } }) => <Title>{key}</Title>}
        ListHeaderComponent={() => (
          <Headline style={styles.headline}>
            Chương trình học Nihongo365
          </Headline>
        )}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}
