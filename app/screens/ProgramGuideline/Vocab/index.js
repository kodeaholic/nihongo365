/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { Dimensions, SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const VocabProgramGuideline = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerProps: { title: 'Cách học từ vựng' },
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
            <span style=" color:#00b050;">Ch&agrave;o mừng c&aacute;c bạn đ&atilde; đến với Nihongo365 !</span>
          </strong>
        </p>
        <p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
          <span style="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span style="">Từ vựng trong tiếng Nhật rất nhiều, học được c&agrave;ng nhiều từ th&igrave; lại c&agrave;ng tốt. Nhưng l&agrave;m thế n&agrave;o để học được nhiều từ vựng đ&acirc;y? Tại sao học to&agrave;n qu&ecirc;n? Hay l&agrave; học thuộc từ vựng nhưng kh&ocirc;ng biết vận dụng từ đ&oacute; để hội thoại?. Hiểu được nỗi băn khoăn của c&aacute;c bạn, Ad đ&atilde; tổng hợp c&aacute;ch học từ vựng hiệu quả nhất. C&aacute;c bạn n&ecirc;n &aacute;p dụng trong việc chinh phục từ vựng tiếng Nhật của m&igrave;nh nh&eacute;.</span>
        </p>
        <p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
          <span style="">+, Học từ vựng theo hệ thống, theo chủ đề.</span>
        </p>
        <p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
          <span style="">+, Mỗi từ vựng phải c&oacute; &iacute;t nhất 1 v&iacute; dụ minh họa để l&agrave;m nổi bật từ vựng đ&oacute;, đồng thời c&aacute;c bạn cũng hiểu được từ vựng đ&oacute; sử dụng trong những trường hợp n&agrave;o.</span>
        </p>
        <p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
          <span style="">+, Những từ vựng đ&atilde; học h&atilde;y cố gắng sử dụng để n&oacute;i chuyện với người Nhật, nếu c&aacute;ch sử dụng kh&ocirc;ng đ&uacute;ng th&igrave; người Nhật sẽ tự động sửa gi&uacute;p m&igrave;nh.</span>
        </p>
        <p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
          <span style="">+, Chỉ n&ecirc;n quy định trong 1 tuần học từ vựng của 1 chủ đề, lu&ocirc;n sử dụng từ vựng chủ đề đ&oacute; trong hội thoại tuần đ&oacute;.</span>
        </p>
        <p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
          <span style="">+, Cuối tuần viết 1 b&agrave;i văn ngắn tầm 10 d&ograve;ng, sử dụng tối đa từ vựng trong chủ đề đ&oacute; để viết văn.</span>
        </p>
        <p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
          <span style="">+, Sau 1 th&aacute;ng &ocirc;n tổng hợp những g&igrave; đ&atilde; học, nhờ bạn b&egrave; check từ vựng với tần suất nhanh dần để luyện phản xạ, ghi ch&eacute;p lại những từ m&igrave;nh phản ứng chậm v&agrave; chưa nhớ để học lại.</span>
        </p>
        <p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
          <span style="">+, Thường xuy&ecirc;n luyện những b&agrave;i tập về phần từ vựng, Ad cũng đ&atilde; tổng hợp luyện đề theo từ vựng ri&ecirc;ng.</span>
        </p>
        <p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
          <span style="">+, Lu&ocirc;n đề ra mục ti&ecirc;u học từ vựng trong bao l&acirc;u v&agrave; phải thực hiện đ&uacute;ng mục ti&ecirc;u đ&atilde; đề ra.</span>
        </p>
        <p style="margin-top:0pt; margin-bottom:10pt; text-align:right; line-height:150%; font-size:14pt;">
        Ch&uacute;c c&aacute;c bạn sớm nhớ nhanh chữ H&aacute;n !
        </p>
        <p style="margin-top:0pt; margin-bottom:10pt; text-align:right; line-height:150%; font-size:14pt;">
        Admin&nbsp;&nbsp;
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
