/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { Dimensions, SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const DialogProgramGuideline = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerProps: { title: 'Cách học hội thoại' },
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
    <span style="color:#00b050;">Cách hội thoại trong Nihongo365 cho tốt</span>
  </strong>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <span style="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  <span style="">Với Nihongo365 thì khi bạn là nữ thì vai nữ trong ứng dụng, có thể ấn hoặc không cần ấn vai của mình và vai nam thì các bạn cho phát âm của nam. Có thể đổi vai các bạn nhé. Nihongo365 đã cho các bạn cảm giác giống như đang hội thoại cùng với bạn của mình. Điều đó sẽ không tạo cho các bạn cảm giác nhàm chán. Hơn nữa các bạn có thể đọc và chỉnh âm của mình theo giọng cho sẵn, chỉ khi ấn nút thì mới phát âm thanh. Các bạn muốn hội thoại nhanh thì ấn nhanh.</span>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <span style="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  <span style="">Đối với phần hội thoại cả bài thì sẽ cho các bạn có được cảm giác như mình đang hòa mình vào cuộc hội thoại đó.</span>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <span style="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  <span style="">Lý do Nihongo365 không sắp xếp từ bài dễ đến khó mà xếp ngẫu nhiên các bài khó dễ lẫn lộn là có một điều duy nhất: Nói chuyện với người Nhật không phải câu nào cũng dễ. Đối với câu nào các bạn không hiểu nghĩa thì đã có phần dịch nghĩa đi kèm.</span>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <span style="">&nbsp;&nbsp;&nbsp;&nbsp;</span>
  <span style="">Không nói được thì phải nói nhiều, bài hội thoại của Nihongo365 được cập nhật thường xuyên sẽ tăng lên theo ngày tháng chính và không có sự trùng bài đã có. Việc của các bạn là hội thoại theo bài mà Nihongo365 đưa ra thôi. Biết đâu một ngày nào đó mình lại sử dụng 1 trong những câu hội thoại đó để nói với bạn của mình hoặc người Nhật thì sao nhỉ ? Ví dụ đơn giản thế này thôi: Trong bài hội thoại có câu ‘‘ Tôi không biết cậu ấy đi đâu rồi ’’ có trong bài hội thoại. Chắc chắn 1 lúc nào đó ta lại sử dụng chính câu đó luôn cũng nên. Mình đã học, đã hội thoại rồi thì sẽ nói nhanh, khi gặp mình sẽ phảm ứng nhanh hơn. Học càng nhiều tốt, tích tiểu thành đại các bạn nhé!</span>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <span style="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Chúc các bạn học tốt phần này. Rất quan trọng các bạn nhé!</span>
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
