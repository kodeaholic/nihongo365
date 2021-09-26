/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import { Button, Card, Divider, Text } from 'react-native-paper';

import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';

import ProfileCard from '../../../components/profile-card';

import * as programActions from '../../../actions/programActions';
import { PROGRAM_IDS } from '../data';
import { LEVEL } from '../../../constants/level';
const COLORS = {
  N5: 'rgba(241, 130, 141,1)',
  N4: 'rgba(165, 55, 253, 1)',
  N3: 'rgba(0, 181, 204, 1)',
  N2: 'rgba(63, 195, 128, 1)',
  N1: 'rgba(241, 90, 34, 1)',
};
const Item = ({ item, first, last }) => {
  const { id, name, tags, program, available } = item;
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
          case PROGRAM_IDS.HOITHOAI:
            navigation.navigate('DialogProgramGuideline');
            break;
          case PROGRAM_IDS.NGHE:
            navigation.navigate('ListeningProgramGuideline');
            break;
          case PROGRAM_IDS.GRAMMAR:
            navigation.navigate('GrammarProgramGuideline');
            break;
          case PROGRAM_IDS.READING:
            navigation.navigate('ReadingProgramGuideline');
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
    <Card style={[styles.card, last ? { marginBottom: 12 } : {}]}>
      <ProfileCard
        disableRightBtn={
          id === PROGRAM_IDS.LUYENTHI || id === PROGRAM_IDS.THITHU
            ? true
            : false
        }
        authorName={name}
        program={program}
        onSelected={onSelected}
      />
      <Card.Content>
        <View style={styles.tags}>
          {tags.map((itx, i) => {
            const { labelColor, buttonColor } = {
              labelColor: '#fff',
              buttonColor: COLORS[itx],
            };
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
                case PROGRAM_IDS.GRAMMAR:
                  navigation.navigate('GrammarSelection');
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
  card: {
    marginTop: 12,
    marginHorizontal: 12,
    //borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cardTitle: { fontWeight: 'normal', fontFamily: 'SF-Pro-Detail-Regular' },
  cardSub: {
    fontSize: 13,
    color: '#0097e8',
    fontFamily: 'SF-Pro-Detail-Regular',
  },
  duration: {
    fontSize: 16,
    marginVertical: 16,
    marginHorizontal: 4,
    fontFamily: 'SF-Pro-Detail-Regular',
    color: '#000',
  },
  tags: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth
  },
  tag: {
    flex: 1,
    margin: 4,
    borderRadius: 5,
    fontFamily: 'SF-Pro-Detail-Regular',
  },
  tagLabel: { fontSize: 12, fontFamily: 'SF-Pro-Detail-Regular' },
});

export default Item;
