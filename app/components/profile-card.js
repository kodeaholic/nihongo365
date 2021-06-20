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
    <Avatar.Image {...props} source={require('app/assets/logo.png')} />
  );
  const RightContent = props => (
    <Chip
      mode="flat"
      icon="comment-question-outline"
      onPress={onSelected}
      style={styles.chip}>
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
  cardTitle: { fontWeight: 'normal' },
  cardSub: { fontSize: 13, color: '#0097e8' },
  chip: {
    marginRight: 5,
    backgroundColor: '#5cdb5e',
    color: '#ffffff',
  },
});
