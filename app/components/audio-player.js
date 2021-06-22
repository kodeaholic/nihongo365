/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { ToastAndroid, ActivityIndicator, AppState } from 'react-native';
import Slider from 'react-native-slider';
import { StyleSheet, View, Text } from 'react-native';
import { getMMSSTimeString } from '../helpers/time';
import Icon from 'react-native-vector-icons/MaterialIcons';
var Sound = require('react-native-sound');

export const AudioPlayer = props => {
  const { src } = props;
  const [current, setCurrent] = useState(0);
  const [playable, setPlayable] = useState(true);
  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  let [player, setPlayer] = useState(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    player.play(success => {
      if (success) {
        // console.log('Finished!');
        setPlaying(false);
        player.setCurrentTime(0);
        setCurrent(0);
        pause();
      }
    });
    setPlaying(true);
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
    const handleAppStateChange = currentAppState => {
      if (currentAppState === 'background' || currentAppState === 'inactive') {
        // console.log(currentAppState);
        if (player && player.isPlaying()) {
          pause();
        }
      }
    };
    AppState.addEventListener('change', handleAppStateChange);
  });

  /** Load the file */
  useEffect(() => {
    if (!player) {
      // Sound.setCategory('Playback');
      let soundPlayer;
      try {
        soundPlayer = new Sound(src, null, error => {
          if (error) {
            ToastAndroid.showWithGravityAndOffset(
              'File âm thanh bị hư hại. Xin liên hệ với giảng viên để được hỗ trợ',
              ToastAndroid.LONG,
              ToastAndroid.TOP,
              0,
              100,
            );
            setPlayable(false);
            setPlayer({ player: false });
          }

          setPlayable(true);
          setPlayer(soundPlayer);
          setDuration(soundPlayer.getDuration());
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
      </View>
    );
  } else {
    // console.log(player.isPlaying());
    return (
      <View style={styles.container}>
        <View
          style={{ height: 15, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ flex: 0.2, textAlign: 'center' }}>
            {getMMSSTimeString(current + '')}
          </Text>
          <Slider
            style={styles.slider}
            thumbTintColor="#5cdb5e"
            value={current}
            onValueChange={value => {
              setCurrent(value);
              player.setCurrentTime(value);
            }}
            minimumValue={0}
            maximumValue={duration}
            step={1}
            thumbTouchSize={{ width: 50, height: 50 }}
          />
          <Text style={{ flex: 0.2, textAlign: 'center' }}>
            {getMMSSTimeString(duration + '')}
          </Text>
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
                <Icon name="play-circle-outline" size={35} color="#5cdb5e" />
                <Icon name="pause-circle-outline" size={35} color="#5cdb5e" />
              </View>
            </>
          )}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
  slider: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 20,
  },
  button: {
    height: 25,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
