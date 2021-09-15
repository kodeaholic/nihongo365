/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { Dimensions, SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const GrammarProgramGuideline = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerProps: { title: 'Cách học ngữ pháp' },
    });
  }, [navigation]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <WebView
        style={{
          flex: 1,
          backgroundColor: '#fff',
          paddingBottom: 10,
          height: windowHeight - 56 * 2,
        }}
        source={{
          html: `<html lang="en" style="scroll-behavior: smooth;">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap" rel="stylesheet">
    <style>
      body {
        padding: 0;
        margin: 0
      }
      * {
        max-width: ${windowWidth - 10}px;
        outline: none;
        word-break: break-word
      }

      * {
        scroll-behavior: smooth;
        font-family: 'Source Sans Pro', serif
      }

      * {
        scroll-behavior: smooth
      }

      main {
        font-family: 'Source Sans Pro', serif;
        margin: 5px;
        width: ${windowWidth - 10}px;
        height: calc(100vh);
        display: flex;
        flex-direction: column;
        font-weight: normal;
        overflow-y: scroll;
        margin: 0;
        padding-left: 5px;
      }

      .content {
        font-family: 'Source Sans Pro', serif;
        font-weight: bold;
        line-height: 220%;
        word-break: break-word
      }

      * {
        font-weight: normal;
      }
    </style>
  </head>
  <body cz-shortcut-listen="true" style="background-color: #fff;">
    <main>
      <div class="content">
<p style="margin-top:10px; margin-bottom:15.6pt; text-align:justify; line-height:150%; font-size:14pt; background-color:#ffffff;">
  <strong>
    <span style=" color:#00b050;">Ngữ pháp là một trong những phần khó học trong tiếng Nhật. Sau đây Nihongo365 sẽ đưa ra phương pháp học ngữ pháp mà Admin cho là hiệu quả nhất nhé.</span>
  </strong>
</p>
<p style="margin-top:0pt; margin-bottom:15.6pt; text-align:justify; line-height:150%; font-size:14pt; background-color:#ffffff;">
  <strong>
    <span style="font-family:'ＭＳ 明朝'; color:#000080;">＊&nbsp;</span>
  </strong>
  <strong>
    <span style=" color:#000080;">Lấy ví dụ cho mẫu ngữ pháp đang học:</span>
  </strong>
</p>
<p style="margin-top:0pt; margin-bottom:15.6pt; text-align:justify; line-height:150%; font-size:14pt; background-color:#ffffff;">
  <span style="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  <span style="">Với mỗi cấu trúc ngữ pháp thì đều có ví dụ minh họa để làm nổi bật cho cấu trúc ngữ pháp đó. Các bạn áp theo cấu trúc để tự lấy ví dụ ngoài sách vở. Đặc biệt với những ví dụ có trong thực tiễn thì các bạn nhớ rất lâu, nếu có thể thì nên sử dụng 1 số cấu trúc mà Admin có đánh dấu là sử dụng vào hội thoại để nói chuyện với người Nhật hoặc với bạn bè của mình thì khả năng nhớ cấu trúc ngữ pháp đó càng lâu. Hơn nữa các bạn cũng đã có thể áp dụng vào thực tiễn để nói đúng không nào ?</span>
</p>
<p style="margin-top:0pt; margin-bottom:15.6pt; text-align:justify; line-height:150%; font-size:14pt; background-color:#ffffff;">
  <strong>
    <span style="font-family:'ＭＳ 明朝'; color:#000080;">＊</span>
  </strong>
  <strong>
    <span style=" color:#000080;">&nbsp;Tổng hợp ngữ pháp thường xuyên:</span>
  </strong>
</p>
<p style="margin-top:0pt; margin-bottom:15.6pt; text-align:justify; line-height:150%; font-size:14pt; background-color:#ffffff;">
  <span style=" color:#777777;">&nbsp;&nbsp;&nbsp;</span>
  <span style="">&nbsp;&nbsp;</span>
  <span style="">Học đi thì phải học lại, phải có kế hoạch để tổng hợp theo tuần hay theo tháng. Ví dụ trong 1 tuần các bạn học được 20 cấu trúc ngữ pháp chẳng hạn. Nếu tịnh tiến thì trong 1 tháng thì các bạn học được khá nhiều, khi đó học quay lại thì thử hỏi nhớ được bao nhiêu cấu trúc ngữ pháp ? Chúng ta phải tổng hợp xem trong 1 tuần ấy mình học thì còn nhớ được bao cấu trúc, quên thì học lại thì sẽ nhớ. Hãy hình dung khi mới bắt đầu học tiếng Anh bằng chữ School mình không biết nghĩa và thành phần tạo nên chữ đó là gì. Nhưng sau nhiều lần nhìn, đọc thì cuối cùng không quên nổi. Ngữ pháp cũng thế nhé.</span>
</p>
<p style="margin-top:0pt; margin-bottom:15.6pt; text-align:justify; line-height:150%; font-size:14pt; background-color:#ffffff;">
  <strong>
    <span style="font-family:'ＭＳ 明朝'; color:#000080;">＊</span>
  </strong>
  <strong>
    <span style=" color:#000080;">Làm nhiều dạng bài tập khác nhau:</span>
  </strong>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <span style="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  <span style="">Admin cũng đã đăng rất nhiều bài tập chuyên dành cho phần ngữ pháp và cũng sẽ được cập nhật thường xuyên nên các bạn hãy thường xuyên vào làm bài tập nhé.</span>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <strong>
    <span style="font-family:'ＭＳ 明朝'; color:#000080;">＊</span>
  </strong>
  <strong>
    <span style=" color:#000080;">Học ngữ pháp giống như học từ vựng:</span>
  </strong>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <span style="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  <span style="">Đúng vậy, các bạn nên tổng hợp cách hiểu của mình về các cấu trúc ngữ pháp thành 1 danh sách vắn tắt để đơn giản hóa như những từ vựng.</span>
  <span style="">&nbsp;&nbsp;</span>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <strong>
    <span style="font-family:'ＭＳ 明朝'; color:#000080;">＊</span>
  </strong>
  <strong>
    <span style=" color:#000080;">Thường xuyên xem phim hay thời sự tiếng Nhật:</span>
  </strong>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <span style="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  <span style="">Trong các bộ phim truyền hình hay thời sự...đều có ngữ pháp các bạn nhé. Hãy chú ý họ ghép câu cú, văn từ... Chắc chắn các bạn sẽ không hiểu nhưng không nản nhé. Vừa xem, vừa nghe, vừa đọc hay vừa viết chẳng hạn. Đến khi các bạn học đến những từ các bạn từng được nghe, được xem, được đọc thì các bạn sẽ thấy hiệu quả nhé.</span>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <strong>
    <span style="font-family:'ＭＳ 明朝'; color:#000080;">＊</span>
  </strong>
  <strong>
    <span style=" color:#000080;">Học những cấu tr&uacute;c ngữ ph&aacute;p c&oacute; li&ecirc;n quan đến nhau:</span>
  </strong>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <span style="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  <span style="">Học những cấu trúc ngữ pháp có liên quan đến nhau thì sẽ tạo cho não bộ của các bạn có cách nhớ và lập luận logic, dễ nhớ và sẽ làm giảm được nhiều thời gian học ngữ pháp của các bạn.</span>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <strong>
    <span style="font-family:'ＭＳ 明朝'; color:#000080;">＊</span>
  </strong>
  <strong>
    <span style=" color:#000080;">Khi học ngữ ph&aacute;p n&ecirc;n kết hợp c&aacute;c cấu tr&uacute;c ngữ ph&aacute;p:</span>
  </strong>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <span style="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  <span style="">Một câu nói hay 1 đoạn văn thì có đến 5 or 6, 10 cấu trúc ngữ pháp. Nên khi học, khi lấy ví dụ các bạn nên kết hợp nhiều cấu trúc ngữ pháp đã học trước đó để làm nổi bật cho câu đó miễn sao đúng cấu trúc ngữ pháp là được.</span>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <span style="">&nbsp;</span>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <span style="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  <span style="">Trên đây là toàn bộ kinh nghiệm học ngữ pháp của Admin. Mong rằng các bạn sẽ áp dụng để hoàn thiện cách học của bản thân sao cho hiệu quả nhất.</span>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-indent:6.75pt; text-align:justify; line-height:150%; font-size:14pt;">
<span style="">&nbsp;&nbsp;&nbsp;</span>
  <span style="">Ch&uacute;c c&aacute;c bạn sớm chinh phục được ngữ ph&aacute;p của c&aacute;c tr&igrave;nh độ nh&eacute; !</span>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-indent:6.75pt; text-align:right; line-height:150%; font-size:14pt;">
  <span style="">Admin&nbsp;&nbsp;&nbsp;</span>
</p>
      <br />
    </main>
  </body>
</html>`,
        }}
      />
    </SafeAreaView>
  );
};
