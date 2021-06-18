import React from 'react';
import { View } from 'react-native';

import Programs from './index.mobile';
import ProgramDetail from 'app/screens/AppointmentDetail';
import Calendar from 'app/screens/Calendar';

export default function Appointments({ navigation }) {
  const onClick = () => navigation.navigate('AppointmentDetail');
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ flex: 1.2 }}>
        <Programs />
      </View>
      <View style={{ flex: 1.2 }}>
        <ProgramDetail />
      </View>
      <View style={{ flex: 2 }}>
        <Calendar />
      </View>
    </View>
  );
}
