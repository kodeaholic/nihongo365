import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../../components/commonHeader';
import { useSelector } from 'react-redux';
export const VocabTopicSelection = () => {
  const selectedLevel = useSelector(
    state => state.programReducer.selectedLevel,
  );
  return (
    <>
      <Header title={`Học từ vựng ${selectedLevel}`} />
    </>
  );
};

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
