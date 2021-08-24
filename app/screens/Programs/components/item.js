import React from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import { Button, Card, Divider, Text } from 'react-native-paper';

import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';

import { random_rgba } from 'app/utils/random_rgba';
import ProfileCard from '../../../components/profile-card';

import * as programActions from '../../../actions/programActions';
import { PROGRAM_IDS } from '../data';
import { LEVEL } from '../../../constants/level';
const Item = ({ item }) => {
  const { id, name, description, tags, avatar, program, available } = item;
  const navigation = useNavigation();
  const isTablet = DeviceInfo.isTablet();

  const dispatch = useDispatch();

  const onSelected = () => {
    if (available) {
      if (!isTablet) {
        switch (id) {
          case PROGRAM_IDS.TUVUNG:
            navigation.navigate('VocabProgramGuideline');
            break;
          case PROGRAM_IDS.CHUHAN:
            navigation.navigate('ChuHanProgramGuideline');
            break;
          default:
            break;
        }
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
            const onLevelButtonPressed = () => {
              dispatch(
                programActions.levelSelected({
                  selectedID: id,
                  selectedLevel: itx,
                }),
              );
              switch (id) {
                case PROGRAM_IDS.TUVUNG:
                  navigation.navigate('VocabTopicSelection');
                  break;
                case PROGRAM_IDS.CHUHAN:
                  navigation.navigate('ChuHanBoardSelection');
                  break;
                case PROGRAM_IDS.NGHE:
                  navigation.navigate('ListeningLessonSelection');
                  break;
                case PROGRAM_IDS.HOITHOAI:
                  navigation.navigate('DialogLessonSelection');
                  break;
                case PROGRAM_IDS.READING:
                  navigation.navigate('ReadingLessonSelection');
                  break;
                case PROGRAM_IDS.LUYENTHI:
                  navigation.navigate('SubTestSelection');
                  break;
                case PROGRAM_IDS.THITHU:
                  navigation.navigate('TrialTestSelection');
                  break;
                default:
                  break;
              }
            };
            return (
              <Button
                id={`level-${LEVEL[itx]}`}
                key={i}
                compact
                disabled={!available}
                uppercase={false}
                style={[styles.tag, { backgroundColor: buttonColor }]}
                labelStyle={[styles.tagLabel, { color: labelColor }]}
                onPress={() => {
                  onLevelButtonPressed();
                }}>
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
