/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Card, IconButton, Chip } from 'react-native-paper';

export default function profileCard({
  authorName,
  program,
  onSelected,
  disableRightBtn,
}) {
  const LeftContent = props => (
    <Avatar.Image
      {...props}
      source={require('app/assets/logo.png')}
      size={50}
    />
  );
  const RightContent = props => (
    <Chip
      mode="flat"
      onPress={onSelected}
      style={styles.chip}
      textStyle={{ color: '#fff' }}>
      Cách học
    </Chip>
  );
  return (
    <Card.Title
      title={program}
      left={LeftContent}
      right={disableRightBtn ? null : RightContent}
      titleStyle={styles.cardTitle}
      subtitleStyle={styles.cardSub}
    />
  );
}

const styles = StyleSheet.create({
  cardTitle: {
    fontWeight: 'normal',
    fontFamily: 'SF-Pro-Detail-Regular',
    color: '#000',
  },
  cardSub: {
    fontSize: 13,
    color: '#0097e8',
    fontFamily: 'SF-Pro-Detail-Regular',
  },
  chip: {
    marginHorizontal: 16,
    backgroundColor: '#5cdb5e',
    color: '#fff',
    fontFamily: 'SF-Pro-Detail-Regular',
  },
});
