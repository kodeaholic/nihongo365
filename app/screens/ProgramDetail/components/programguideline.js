import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, withTheme, Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux';

import Section from '../../../components/section-item';
import { Paragraph } from 'react-native-paper';

function ProgramInfo({ theme }) {
  const { colors } = theme;
  const selectedID = useSelector(state => state.programReducer.selectedID);
  const programs = useSelector(state => state.programReducer.programs);
  const program = programs.find(itx => itx.id === selectedID);
  const AvatarSignature = props => (
    <View style={styles.bottomSignature}>
      <Avatar.Image
        size={86}
        {...props}
        style={{ marginTop: 0, marginBottom: 10, marginLeft: 10 }}
        source={require('app/assets/logo.png')}
      />
    </View>
  );
  return (
    <React.Fragment>
      <Text style={styles.title}>Hướng dẫn học</Text>
      <Card style={styles.card}>
        <React.Fragment>
          <View style={styles.content}>
            <Paragraph style={styles.paragraph}>
              Từ vựng trong tiếng Nhật rất nhiều, học được càng nhiều từ thì lại
              càng tốt. Nhưng làm thế nào để học được nhiều từ vựng đây? Tại sao
              học toàn quên? Hay là học thuộc từ vựng nhưng không biết vận dụng
              từ đó để hội thoại?
            </Paragraph>
            <Paragraph style={styles.paragraph}>
              Hiểu được nỗi băn khoăn của các bạn, Ad đã tổng hợp cách học từ
              vựng hiệu quả nhất. Các bạn nên áp dụng trong việc chinh phục từ
              vựng tiếng Nhật của mình nhé.
            </Paragraph>
            <Section
              name="Học từ vựng theo hệ thống, theo chủ đề"
              icon="check"
              color={colors.accent}
              style={styles.section}
            />
            <Section
              name="Mỗi từ vựng phải có ít nhất 1 ví dụ minh họa để làm nổi bật từ vựng đó, đồng thời các bạn cũng hiểu được từ vựng đó sử dụng trong những trường hợp nào."
              icon="check"
              color={colors.accent}
              style={styles.section}
            />
            <Section
              name="Những từ vựng đã học hãy cố gắng sử dụng để nói chuyện với người Nhật, nếu cách sử dụng không đúng thì người Nhật sẽ tự động sửa giúp mình."
              icon="check"
              color={colors.accent}
              style={styles.section}
            />
            <Section
              name="Chỉ nên quy định trong 1 tuần học từ vựng của 1 chủ đề, luôn sử dụng từ vựng chủ đề đó trong hội thoại tuần đó."
              icon="check"
              color={colors.accent}
              style={styles.section}
            />
            <Section
              name="Cuối tuần viết 1 bài văn ngắn tầm 10 dòng, sử dụng tối đa từ vựng trong chủ đề đó để viết văn."
              icon="check"
              color={colors.accent}
              style={styles.section}
            />
            <Section
              name="Sau 1 tháng ôn tổng hợp những gì đã học, nhờ bạn bè check từ vựng với tần suất nhanh dần để luyện phản xạ, ghi chép lại những từ mình phản ứng chậm và chưa nhớ để học lại."
              icon="check"
              color={colors.accent}
              style={styles.section}
            />
            <Section
              name="Thường xuyên luyện những bài tập về phần từ vựng, Ad cũng đã tổng hợp luyện đề theo từ vựng riêng."
              icon="check"
              color={colors.accent}
              style={styles.section}
            />
          </View>
          <AvatarSignature />
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
    fontFamily: 'SF-Pro-Display-Regular',
  },
  head: { marginTop: 24 },
  detail: { flexDirection: 'row', marginVertical: 6 },
  heading: { color: 'grey', fontSize: 16 },
  value: { fontSize: 16 },
  documents: { flexDirection: 'row', justifyContent: 'space-between' },
  paragraph: {
    fontSize: 16,
    fontFamily: 'SF-Pro-Display-Regular',
    letterSpacing: 1.5,
  },
  bottomSignature: {
    // flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
});

export default withTheme(ProgramInfo);
