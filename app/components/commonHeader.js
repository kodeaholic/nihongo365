import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
export const Header = props => {
  const { title, subtitle } = props;
  const navigation = useNavigation();
  const _goBack = () => navigation.goBack();
  return (
    <Appbar.Header style={styles.header}>
      <Appbar.BackAction color="#fff" onPress={_goBack} />
      <Appbar.Content
        titleStyle={styles.title}
        title={title}
        subtitle={subtitle}
        subtitleStyle={styles.subTitle}
      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#5cdb5e',
    textAlign: 'center',
  },
  backButton: {},
  title: { color: '#fff', marginLeft: -4 },
  subTitle: { color: '#fff', marginLeft: -4, marginBottom: 5, fontSize: 15 },
});
