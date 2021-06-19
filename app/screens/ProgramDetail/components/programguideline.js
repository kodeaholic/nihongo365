import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, withTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';

import ProfileCard from 'app/components/profile-card';
import Section from 'app/components/section-item';

const Detail = ({ title, value }) => (
  <View style={styles.detail}>
    <Text style={styles.heading}>{title} : </Text>
    <Text style={styles.value}>{' ' + value}</Text>
  </View>
);

function ProgramInfo({ theme }) {
  const { colors } = theme;
  const selectedID = useSelector(state => state.programReducer.selectedID);
  const programs = useSelector(state => state.programReducer.programs);
  const program = programs.find(itx => itx.id === selectedID);

  return (
    <React.Fragment>
      <Text style={styles.title}>Hướng dẫn học</Text>
      <Card style={styles.card}>
        <React.Fragment>
          <ProfileCard
            name={program.name}
            avatar={program.avatar}
            disableRightBtn={true}
          />
          <View style={styles.content}>
            <Detail title="Ngày sinh" value="02/14/1980" />
            <Detail title="Giới tính" value="Nam" />
            <Detail title="Trình độ cao nhất" value="N2" />

            <Text style={[styles.title, styles.head]}>Cách học cụ thể</Text>
            <Section
              name="+1-202-555-0194"
              icon="phone-outline"
              color={colors.accent}
            />
            <Section
              name="vanduc.senpai@gmail.com"
              icon="email-outline"
              color={colors.accent}
            />
            <Section
              name="Cầu Giấy, Hà Nội"
              icon="home-outline"
              color={colors.accent}
            />
          </View>
        </React.Fragment>
      </Card>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 4 },
  content: { padding: 16 },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  head: { marginTop: 24 },
  detail: { flexDirection: 'row', marginVertical: 6 },
  heading: { color: 'grey', fontSize: 16 },
  value: { fontSize: 16 },
  documents: { flexDirection: 'row', justifyContent: 'space-between' },
});

export default withTheme(ProgramInfo);
