/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { Dimensions, SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const ListeningProgramGuideline = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerProps: { title: 'Cách luyện nghe' },
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
<p style="margin-top:10px; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <strong>
    <span style=" color:#00b050;">Kính chào các bạn !</span>
  </strong>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <span style="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  <span style="">Admin cũng đã nghe rất nhiều bạn phàn nàn là sợ phần nghe, cứ nghe là buồn ngủ, bài nghe thì nhanh quá và vv...Thấu hiểu điều đó chúng tôi đã xây dựng phần luyện nghe cũng rất khác so với những ứng dụng có trên các nền tảng Android, IOS hay Windows.</span>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <span style="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  <span style="">Đối với Nihongo365 các bạn sử dụng phần nghe ( áp dụng tất cả cá bài, nghe bài nào trước cũng được ) theo chình tự sau:</span>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <span style=" color:#ff0000;">Bước 1:</span>
  <span style=""> Ở màn hình đầu tiên có nút nghe, câu hỏi và 4 đáp án. Các bạn ấn vào nút nghe, trong quá trình nghe các bạn nên sử dụng nháp để viết ra những gì mình nghe được. Sau khi nghe xong rồi chọn đáp án. Trong quá trình nghe có thể ấn tạm dừng được nhé.</span>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <span style=" color:#ff0000;">Bước 2:</span>
  <span style="">&nbsp;Các bạn ấn vào phần Lời giải và đợi tầm 5s âm thanh sẽ tự phát ra, lúc này các bạn có thể di chuyển trái phải hoặc phóng to nhỏ để vừa đọc vừa nghe bài đó. Từ nào không hiểu thì các bạn có thể ấn vào nút từ điển để tra rồi ấn lại phần học cũng không bị mất đi.</span>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <span style=" color:#ff0000;">Bước 3:</span>
  <span style="">&nbsp;Ấn vào lời dịch, lúc này phần nghe sẽ được dịch ra tiếng Việt của bài nghe và đáp án đúng. Từ phần dịch thì các bạn cũng sẽ tự hiểu được vì sao chọn được đáp án đúng không nào ?</span>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <strong>
    <span style=" color:#00b050;">Lý do vì sao Nihongo365 xây dựng phần luyện nghe theo 3 bước trên.</span>
  </strong>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <strong>
    <span style="font-family:'ＭＳ 明朝'; color:#ff0000;">＊</span>
  </strong>
  <span style="font-family:'ＭＳ 明朝';">&nbsp;</span>
  <span style="">Nhiều bạn không có phương pháp nghe cụ thể.</span>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <span style="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  <span style="">Bật bài nghe trước khi đi ngủ trên đầu giường, chỉ cần bật nghe tầm 5 phút là các bạn sẽ chìm vào giấc ngủ ngon lành với giấc mơ thần tiên. Nhiều bạn cứ nói, cứ nghe là buồn ngủ. Vì có hiểu gì đâu, chính vì không hiểu gì sẽ khiến não bộ

không phải phân tích và rồi buồn ngủ nhanh. ( Bạn nào mà hiểu nội dung thì sẽ chẳng ngủ được đâu vì càng nghe càng thú vị ).</span>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <strong>
    <span style="font-family:'ＭＳ 明朝'; color:#ff0000;">＊</span>
  </strong>
  <span style="font-family:'ＭＳ 明朝';">&nbsp;</span>
  <span style="">Học thuộc ngữ pháp và từ vựng mà vẫn không nghe được nhiều.</span>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <span style="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  <span style="">Học thuộc thì các bạn chỉ luyện não và luyện cơ miệng chứ chưa luyện cơ tai. Đơn cử khi mới bắt đầu làm việc gì đó mà mình chưa làm bao giờ thì mình cũng phải mất thời gian để quen, để thích nghi nữa mà.</span>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <strong>
    <span style="font-family:'ＭＳ 明朝'; color:#ff0000;">＊</span>
  </strong>
  <span style="font-family:'ＭＳ 明朝';">&nbsp;</span>
  <span style="">Luyện nghe nhiều mà điểm nghe vẫn thấp.</span>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <span style="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  <span style="">Không có phương pháp nghe thì điều này đúng rồi. Mình mất thời gian để nghe chứ khi nghe có chất lượng đâu.</span>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <span style="">Tóm lại: Sau mỗi bài nghe các bạn phải hiểu người ta đã nói gì, nội dung ra sao thì mới đưa ra kết luận được. Sau mỗi lần nghe chúng ta tổng hợp lại những từ vựng chưa biết. Vì những từ vựng đó sẽ giúp ích không nhỏ cho chúng ta về sau.</span>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <strong>
    <span style=" color:#ff0000;">LƯU Ý:</span>
  </strong>
  <span style="">&nbsp;Với mỗi bài nghe thì nghe lại ít nhất 5 lần ( Các bạn hãy so sánh kết quả của việc nghe lần 1 với kết quả của nghe lần 5 nhé ). Nghe nhiều cũng có ích cho hội thoại lắm !</span>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <strong>
    <span style=" color:#7030a0;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  </strong>
  <strong>
    <span style=" color:#7030a0;">Đến với Nihongo365 tài liệu học tập sẽ tăng lên theo ngày tháng. Các bạn sẽ không bao giờ bị bỏ quên.</span>
  </strong>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <em>
    <span style="">&nbsp;&nbsp;&nbsp;&nbsp;</span>
  </em>
  <em>
    <span style="font-style: italic;">Trên đây là những chia sẻ của Admin Nihongo365 rất thô nhưng thật. Vì Admin cũng từng như các bạn khi mới học tiếng Nhật. Hãy chia sẻ cách luyện nghe này đến với những bạn bè của bạn khi thấy có giá trị nhé.</span>
  </em>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <span style="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  <span style="">Ch&uacute;c c&aacute;c bạn sớm chinh phục được phần nghe thật hiệu quả nh&eacute; !</span>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <span style="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Admin</span>
</p>
      </div>
      <br />
    </main>
  </body>
</html>`,
        }}
      />
    </SafeAreaView>
  );
};
