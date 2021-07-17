/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { ToastAndroid, ActivityIndicator, AppState } from 'react-native';
import Slider from 'react-native-slider';
import { StyleSheet, View, Text, BackHandler } from 'react-native';
import { getMMSSTimeString } from '../helpers/time';
import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';
import { useNavigation } from '@react-navigation/native';
var Sound = require('react-native-sound');

export const AudioPlayer = props => {
  const { src } = props;
  const [current, setCurrent] = useState(0);
  const [playable, setPlayable] = useState(true);
  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  let [player, setPlayer] = useState(null);
  const [displayDuration, setDisplayDuration] = useState(true);
  const [playing, setPlaying] = useState(false);
  const navigation = useNavigation();
  /** for timer */
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    let interval = null;
    if (playing) {
      interval = setInterval(() => {
        setSeconds(time => time + 1);
      }, 1000);
    } else if (!playing) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [playing, seconds]);

  const play = () => {
    setPlaying(true);
    player.play(success => {
      if (success) {
        setPlaying(false);
        player.setCurrentTime(0);
        pause();
        setSeconds(0);
      }
    });
  };
  const stop = () => {
    player.stop();
    setPlaying(false);
  };
  const pause = () => {
    // console.log('Paused!');
    player.pause();
    setPlaying(false);
  };

  useEffect(() => {
    if (!_.isEmpty(src)) {
      const handleAppStateChange = currentAppState => {
        if (
          currentAppState === 'background' ||
          currentAppState === 'inactive'
        ) {
          if (player && player.isPlaying()) {
            pause();
          }
        }
      };
      AppState.addEventListener('change', handleAppStateChange);
      const backAction = () => {
        console.log('BackButton clicked! Navigating back ...');
        if (player && player.isPlaying()) {
          console.log('Pausing audio file ...');
          pause();
          // navigation.goBack(null);
        }
        // return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      navigation.addListener('beforeRemove', e => {
        console.log('Navigating back ...');
        if (player && player.isPlaying()) {
          console.log('Pausing audio file ...');
          pause();
        }
      });
      return () => {
        backHandler.remove();
        navigation.removeListener('beforeRemove');
      };
    }
  });

  /** Load the file */
  useEffect(() => {
    if (!player) {
      // Sound.setCategory('Playback');
      let soundPlayer;
      try {
        soundPlayer = new Sound(src, null, error => {
          if (error) {
            // ToastAndroid.showWithGravityAndOffset(
            //   'File âm thanh bị hư hại. Xin liên hệ với giảng viên để được hỗ trợ',
            //   ToastAndroid.LONG,
            //   ToastAndroid.TOP,
            //   0,
            //   100,
            // );
            setPlayable(false);
            setPlayer({ player: false });
          }

          setPlayer(soundPlayer);
          if (soundPlayer.isLoaded()) {
            if (soundPlayer.getDuration() > 0) {
              setDuration(soundPlayer.getDuration());
              setDisplayDuration(true);
            } else {
              ToastAndroid.showWithGravityAndOffset(
                'Vấn đề mạng, không lấy được thời gian kết thúc file audio. Vui lòng bấm và đợi nghe cho đến hết bài học',
                200,
                ToastAndroid.TOP,
                0,
                100,
              );
              setDuration(1000);
              setDisplayDuration(false);
            }
            setPlayable(true);
          } else {
            setPlayable(false);
            setDuration(-1);
          }
          setLoading(false);
        });
      } catch (e) {
        ToastAndroid.showWithGravityAndOffset(
          'File âm thanh bị hư hại. Xin liên hệ với giảng viên để được hỗ trợ',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          0,
          100,
        );
        setPlayer({ player: false });
      }
    }
  }, [src, player]);

  if (loading && !player) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" style={{ marginTop: 10 }} />
        <Text style={{ textAlign: 'center' }}>Tải file âm thanh</Text>
      </View>
    );
  } else {
    // console.log(player.isPlaying());
    if (duration > 0) {
      return (
        <View style={styles.container}>
          <View
            style={{
              height: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{ flex: 0.2, textAlign: 'center' }}>
              {getMMSSTimeString(seconds + '')}
            </Text>
            <Slider
              disabled={!displayDuration}
              style={styles.slider}
              thumbTintColor="#5cdb5e"
              value={seconds}
              onValueChange={value => {
                setSeconds(value);
                player.setCurrentTime(value);
              }}
              minimumValue={0}
              maximumValue={duration}
              step={1}
              thumbTouchSize={{ width: 40, height: 40 }}
              minimumTrackTintColor="#5cdb5e"
            />
            {displayDuration && (
              <Text style={{ flex: 0.2, textAlign: 'center' }}>
                {getMMSSTimeString(duration + '')}
              </Text>
            )}
            {!displayDuration && (
              <Text style={{ flex: 0.2, textAlign: 'center' }}>--:--</Text>
            )}
          </View>
          <View style={styles.button}>
            {playable && (
              <>
                <View
                  style={{
                    // paddingVertical: 15,
                    paddingHorizontal: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  {!playing && (
                    <Icon
                      name="play-circle-outline"
                      size={35}
                      color="#5cdb5e"
                      onPress={play}
                    />
                  )}
                  {playing && (
                    <Icon
                      name="pause-circle-outline"
                      size={35}
                      color="#5cdb5e"
                      onPress={pause}
                    />
                  )}
                </View>
              </>
            )}
          </View>
        </View>
      );
    }
    if (duration <= 0) {
      return (
        <View style={styles.container}>
          <Text style={{ textAlign: 'center', marginTop: 5 }}>
            Không thể phát file âm thanh vào lúc này
          </Text>
        </View>
      );
    }
  }
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingTop: 2,
    paddingBottom: 5,
    marginVertical: 0,
  },
  slider: {
    flex: 1,
    // marginVertical: 5,
    marginHorizontal: 20,
  },
  button: {
    height: 35,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
    marginTop: 0,
  },
});
