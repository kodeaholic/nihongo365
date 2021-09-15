/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { Dimensions, SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const ReadingProgramGuideline = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerProps: { title: 'Cách luyện đọc' },
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
    <span style=" color:#00b050;">K&iacute;nh ch&agrave;o c&aacute;c bạn đ&atilde; đến với phần luyện đọc của Nihongo365 !</span>
  </strong>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <span style="">Để sử dụng tốt phần luyện đọc của Nihongo365 th&igrave; c&aacute;c bạn h&atilde;y l&agrave;m theo c&aacute;c bước sau:</span>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <strong>
    <span style=" color:#ff0000;">Bước 1:</span>
  </strong>
  <span style="">&nbsp;Ở b&agrave;i luyện đọc th&igrave; h&atilde;y tắt n&uacute;t&nbsp;</span>
  <span style=" color:#0070c0;">hiện c&aacute;ch đọc</span>
  <span style="">&nbsp;v&agrave; n&uacute;t&nbsp;</span>
  <span style=" color:#0070c0;">chạm để dịch.</span>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <span style="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  <span style="">Sau khi tắt 2 n&uacute;t đ&oacute; th&igrave; c&aacute;c bạn tiến h&agrave;nh đọc v&agrave; l&agrave;m c&acirc;u hỏi ở cuối mỗi b&agrave;i. Đương nhi&ecirc;n trong qu&aacute; tr&igrave;nh đọc th&igrave; c&aacute;c bạn n&ecirc;n ghi ch&eacute;p lại những &yacute; quan trọng ( khi thi cũng ghi ch&eacute;p lại m&agrave; ) để m&igrave;nh c&oacute; thể vắn tắt nội dung b&agrave;i.</span>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <strong>
    <span style=" color:#ff0000;">Bước 2:</span>
  </strong>
  <span style="">&nbsp;Chỉ bật n&uacute;t&nbsp;</span>
  <span style=" color:#0070c0;">hiện c&aacute;ch đọc:</span>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <span style="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  <span style="">Đọc lại lần nữa để xem m&igrave;nh c&oacute; đọc sai chữ Kanji n&agrave;o kh&ocirc;ng ( tăng năng lực chữ Kanji ).</span>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <strong>
    <span style=" color:#ff0000;">Bước 3:</span>
  </strong>
  <span style="">&nbsp;Bật n&uacute;t&nbsp;</span>
  <span style=" color:#0070c0;">chạm để dịch.</span>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <span style="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  <span style="">L&uacute;c n&agrave;y c&aacute;c bạn h&atilde;y chạm v&agrave;o từng c&acirc;u ngay ch&iacute;nh b&agrave;i đọc, th&igrave; c&aacute;c bạn sẽ hiểu nghĩa c&acirc;u đ&oacute;. N&ecirc;n so s&aacute;nh với phần dịch của c&aacute;c bạn.</span>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <strong>
    <em>
      <span style=" color:#ff0000;">LƯU &Yacute;</span>
    </em>
  </strong>
  <em>
    <span style="">: C&aacute;c bạn c&oacute; thể đọc bất cứ b&agrave;i n&agrave;o cũng được. Để n&acirc;ng cao khả năng luyện đọc th&igrave; chỉ c&oacute; thể đọc nhiều. Chữ Kanji được đọc, được nh&igrave;n thấy nhiều sẽ nhớ l&acirc;u hơn.</span>
  </em>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
  <span style="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  <span style="">Ch&uacute;c c&aacute;c bạn sớm chinh phục được phần luyện đọc một c&aacute;ch hiệu quả nhất !</span>
</p>
<p style="margin-top:0pt; margin-bottom:10pt; text-align:right; line-height:150%; font-size:14pt;">
  <span style="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
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
