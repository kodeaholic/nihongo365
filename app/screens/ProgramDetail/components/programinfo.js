import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, withTheme } from 'react-native-paper';
import DeviceInfo from 'react-native-device-info';

import CustomParagraph from '../../../components/paragraph';

function ProgramInfo({ theme }) {
  const { colors } = theme;

  const isTablet = DeviceInfo.isTablet();
  return (
    <View style={{ marginTop: 0 }}>
      {isTablet && <Text style={styles.title}>Chương trình học</Text>}
      <CustomParagraph text="Học từ vựng theo các chủ đề" />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  section: { flexDirection: 'row', alignItems: 'center' },
  name: { fontSize: 16 },
});

export default withTheme(ProgramInfo);
