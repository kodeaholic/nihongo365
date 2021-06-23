import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, withTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';

import Section from '../../../components/section-item';
import { Paragraph } from 'react-native-paper';
import { AvatarSignature } from './avatarSignature';
function ProgramInfo({ theme }) {
  const { colors } = theme;
  const selectedID = useSelector(state => state.programReducer.selectedID);
  const programs = useSelector(state => state.programReducer.programs);
  const program = programs.find(itx => itx.id === selectedID);
  return (
    <React.Fragment>
      <View style={{ backgroundColor: '#e5dfd7' }}>
        <Text style={styles.title}>Hướng dẫn học</Text>
        <Card style={styles.card}>
          <React.Fragment>
            <View style={styles.content}>
              <View style={styles.paragraph}>
                <Text
                  style={[
                    styles.paragraph,
                    { fontWeight: 'bold', color: '#5cdb5e' },
                  ]}>
                  Âm On
                </Text>
                <Text style={styles.paragraph}>
                  {'    - '}Là âm Hán Nhật, thường thì từ 2 chữ hán trở lên thì
                  sử dụng âm On ghép với nhau để đọc. Nhiều trường hợp đặc biệt
                  thì 2 chữ hán cũng có thể sử dụng âm Kun, âm On ghép lẫn nhau
                  để đọc. Chữ nào có trường hợp đó thì Ad sẽ đưa ra ở phần ví
                  dụ.
                </Text>
              </View>
              <View style={styles.paragraph}>
                <Text
                  style={[
                    styles.paragraph,
                    { fontWeight: 'bold', color: '#5cdb5e' },
                  ]}>
                  Âm Kun
                </Text>
                <Text style={styles.paragraph}>
                  {'    - '}Là âm thuần Nhật, thường là sử dụng để đọc động từ,
                  1 chữ hán, các trợ từ...
                </Text>
              </View>
              <Section
                name="Để có thể đọc được chữ Hán thì ta phải nhớ được âm On và âm Kun."
                icon="check"
                color={colors.accent}
                style={styles.section}
              />
              <Section
                name="Để có thể viết được thì phải nhớ thành phần tạo nên chữ đó. Ví như trong chữ Hưu ( 休) thì bao gồm Nhân đứng (亻)  và  bộ Mộc (木). Bạn không phải lo lắng phải tìm từng bộ ở đâu cả. Khi học đến chữ Hán nào thì Ad sẽ thêm thành phần của chữ  đó."
                icon="check"
                color={colors.accent}
                style={styles.section}
              />
              <Section
                name="Không cần phải học quy tắc viết ( Từ trong ra ngoài, trên rồi dưới...) các bạn chỉ cần viết theo thứ tự các nét mà chữ đó hiển thị, sau thời gian tay của bạn sẽ tự quen cách viết đó."
                icon="check"
                color={colors.accent}
                style={styles.section}
              />
              <Section
                name="Không phải thống kê và học ngấu nghiến để hết các bộ thủ ấy rồi mới học chữ Hán. Học đến cuối thì đoạn đầu nhớ bao nhiêu chữ. Ad đã chỉ ra bộ thủ trong từng bài, từng chữ Hán đó."
                icon="check"
                color={colors.accent}
                style={styles.section}
              />
              <Section
                name="Ví dụ minh họa cho chữ Hán là từ vựng thường hay sử dụng và thiết thực. Các bạn nên nhớ đa số từ vựng đó và khi học xong phần chữ Hán thì vốn từ vựng khá nhiều rồi."
                icon="check"
                color={colors.accent}
                style={styles.section}
              />
              <Section
                name="Cố gắng làm hết bài tập trắc nghiệm sau mỗi bài, khi học bài mới thì hãy 1 lần nữa ôn lại bài cũ. Sau 10 ngày thì ôn lại, sau 1 tháng lại ôn tổng hợp."
                icon="check"
                color={colors.accent}
                style={styles.section}
              />
              <Section
                name="Cố gắng nhớ âm Hán Việt và nghĩa của nó, hiểu nó thì các bạn có thể tự ghép được từ vựng mới."
                icon="check"
                color={colors.accent}
                style={styles.section}
              />
              <Section
                name="Quy định mỗi 2 ngày chỉ học 10 chữ Hán mà Ad đã soạn trong 1 bài. Chậm nhưng chắc, 2 ngày 10 từ, 20 ngày chắc chắn có 100 từ. Chữ Hán từ N5 đến N1 chỉ có gần 2000 từ thôi. Các bạn thử tính giúp Ad là bao nhiêu lâu học xong chữ Hán từ N5 đến N1 nhé. Tuy nhiên nếu không ôn lại nhiều lần thì sẽ bị quên."
                icon="check"
                color={colors.accent}
                style={styles.section}
              />
            </View>
            <AvatarSignature text={'Chúc bạn sớm nhớ nhanh chữ Hán!'} />
          </React.Fragment>
        </Card>
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 4 },
  content: { padding: 16, backgroundColor: '#e5dfd7' },
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
});

export const ChuHanGuideline = withTheme(ProgramInfo);
