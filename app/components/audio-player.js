/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { ToastAndroid, ActivityIndicator } from 'react-native';
import Slider from 'react-native-slider';
import { StyleSheet, View, Text } from 'react-native';
import { getMMSSTimeString } from '../helpers/time';
var Sound = require('react-native-sound');

export const AudioPlayer = props => {
  const { src } = props;
  const [current, setCurrent] = useState(0);
  const [playable, setPlayable] = useState(true);
  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  const [player, setPlayer] = useState(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    player.play();
    setPlaying(true);
  };
  const stop = () => {
    player.stop();
    setPlaying(false);
  };
  const pause = () => {
    player.pause();
    setPlaying(false);
  };

  /** Load the file */
  useEffect(() => {
    Sound.setCategory('Playback');
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
  }, [src]);

  if (loading && !player) {
    return <ActivityIndicator size="small" />;
  } else {
    let time = 0;
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ flex: 0.2, textAlign: 'center' }}>
            {getMMSSTimeString(time + '')}
          </Text>
          <Slider
            style={styles.slider}
            thumbTintColor="#5cdb5e"
            value={current}
            onValueChange={value => {
              setCurrent(value);
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
        <View style={styles.footer}>
          {playable && (
            <Text style={{ color: '#5cdb5e' }} onPress={play}>
              Play
            </Text>
          )}
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: 40,
  },
  slider: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  footerItem: {
    flex: 1,
  },
  footerLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  footerRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
