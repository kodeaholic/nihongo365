import React from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import { Button, Card, Divider, Text } from 'react-native-paper';

import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';

import { random_rgba } from 'app/utils/random_rgba';
import ProfileCard from '../../../components/profile-card';

import * as programActions from 'app/actions/programActions';

const Item = ({ item }) => {
  const { id, name, description, tags, avatar, program, available } = item;
  const navigation = useNavigation();
  const isTablet = DeviceInfo.isTablet();

  const dispatch = useDispatch();
  const onSelected = () => {
    if (available) {
      dispatch(programActions.programSelected(id));
      if (!isTablet) {
        navigation.navigate('VocabProgramGuideline');
      }
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'Tính năng sẽ được ra mắt trong thời gian tới',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        0,
        100,
      );
    }
  };
  return (
    <Card style={styles.card}>
      <ProfileCard
        disableRightButton={!available}
        authorName={name}
        program={program}
        onSelected={onSelected}
      />
      <Card.Content>
        <Divider />
        <Text style={styles.duration}>{description}</Text>
        <View style={styles.tags}>
          {tags.map((itx, i) => {
            const { labelColor, buttonColor } = random_rgba();
            return (
              <Button
                key={i}
                mode="contained"
                disabled
                compact
                uppercase={false}
                style={[styles.tag, { backgroundColor: buttonColor }]}
                labelStyle={[styles.tagLabel, { color: labelColor }]}>
                {itx}
              </Button>
            );
          })}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { marginVertical: 12, borderRadius: 4 },
  cardTitle: { fontWeight: 'normal' },
  cardSub: { fontSize: 13, color: '#0097e8' },
  duration: { fontSize: 16, marginVertical: 16 },
  tags: { flexDirection: 'row' },
  tag: {
    marginRight: 4,
    borderRadius: 4,
  },
  tagLabel: { fontSize: 12 },
});

export default Item;
