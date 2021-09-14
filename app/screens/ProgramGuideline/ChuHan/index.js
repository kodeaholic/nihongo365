/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import WebView from 'react-native-webview';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const ChuHanProgramGuideline = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerProps: { title: 'Cách học chữ Hán' },
    });
  }, [navigation]);
  return (
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
        max-width: $ {
          windowWidth - 10
        }

        px;
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

        px;
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
        <p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
          <strong>
            <span style=" color:#00b050;">Ch&agrave;o c&aacute;c bạn đ&atilde; đến với Nihongo365 !</span>
          </strong>
        </p>
        <ul style="margin:0pt; padding-left:0pt;" type="disc">
          <li style="margin-left:29.44pt; text-align:justify; line-height:150%; padding-left:6.56pt; font-family:serif; font-size:14pt; color:#00b0f0;">
            <strong>
              <span style="">&Acirc;m On:</span>
            </strong>
          </li>
          <li style="margin-left:45.66pt; text-align:justify; line-height:150%; padding-left:8.34pt; font-family:serif; font-size:14pt;">
            <span style="">L&agrave; &acirc;m H&aacute;n Nhật, thường th&igrave; từ 2 chữ h&aacute;n trở l&ecirc;n th&igrave; sử dụng &acirc;m On gh&eacute;p với nhau để đọc.</span>
            <span style="">&nbsp;&nbsp;</span>
            <span style="">Nhiều trường hợp đặc biệt th&igrave; 2 chữ h&aacute;n cũng c&oacute; thể sử dụng &acirc;m Kun, &acirc;m On gh&eacute;p lẫn nhau để đọc. Chữ n&agrave;o c&oacute; trường hợp đ&oacute; th&igrave; Ad sẽ đưa ra ở phần v&iacute; dụ.</span>
          </li>
          <li style="margin-left:29.44pt; text-align:justify; line-height:150%; padding-left:6.56pt; font-family:serif; font-size:14pt; color:#00b0f0;">
            <strong>
              <span style="">&Acirc;m Kun :</span>
            </strong>
          </li>
          <li style="margin-left:45.66pt; margin-bottom:10pt; text-align:justify; line-height:150%; padding-left:8.34pt; font-family:serif; font-size:14pt;">
            <span style="">L&agrave; &acirc;m thuần Nhật, thường l&agrave; sử dụng để đọc động từ, 1 chữ h&aacute;n, c&aacute;c trợ từ...</span>
          </li>
        </ul>
        <p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
          <strong>
            <span style="">+</span>
          </strong>
          <span style="">, Để c&oacute; thể đọc được chữ H&aacute;n th&igrave; ta phải nhớ được &acirc;m On v&agrave; &acirc;m Kun.</span>
        </p>
        <p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
          <strong>
            <span style="">+</span>
          </strong>
          <span style="">, Để c&oacute; thể viết được th&igrave; phải nhớ th&agrave;nh phần tạo n&ecirc;n chữ đ&oacute;. V&iacute; như trong chữ Hưu (&nbsp;</span>
          <strong>
            <span style="font-family:'ＭＳ 明朝'; color:#ff0000;">休</span>
          </strong>
          <span style="">) th&igrave; bao gồm Nh&acirc;n đứng (</span>
          <strong>
            <span style="font-family:'MS Gothic'; color:#00b050; background-color:#ffffff;">亻</span>
          </strong>
          <span style=" color:#4f4f4f; background-color:#ffffff;">)</span>
          <span style=" color:#4f4f4f; background-color:#ffffff;">&nbsp;&nbsp;</span>
          <span style=" color:#4f4f4f; background-color:#ffffff;">v&agrave;</span>
          <span style=" color:#4f4f4f; background-color:#ffffff;">&nbsp;&nbsp;</span>
          <span style=" color:#4f4f4f; background-color:#ffffff;">bộ Mộc (</span>
          <strong>
            <span style="font-family:'ＭＳ 明朝'; color:#00b0f0;">木</span>
          </strong>
          <span style="">). Bạn kh&ocirc;ng phải lo lắng phải t&igrave;m từng bộ ở đ&acirc;u cả. Bạn học đến chữ H&aacute;n n&agrave;o th&igrave; Ad sẽ th&ecirc;m th&agrave;nh phần của chữ đó.</span>
        </p>
        <p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
          <strong>
            <span style="">+</span>
          </strong>
          <span style="">, Kh&ocirc;ng cần phải học quy tắc viết ( Từ trong ra ngo&agrave;i, tr&ecirc;n rồi dưới...) c&aacute;c bạn chỉ cần viết theo thứ tự c&aacute;c n&eacute;t m&agrave; chữ đ&oacute; hiển thị, sau thời gian tay của bạn sẽ tự quen c&aacute;ch viết đ&oacute;.</span>
        </p>
        <p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
          <strong>
            <span style="">+</span>
          </strong>
          <span style="">, Kh&ocirc;ng phải thống k&ecirc; v&agrave; học ngấu nghiến để hết c&aacute;c bộ thủ ấy rồi mới học chữ H&aacute;n. Học đến cuối th&igrave; đoạn đầu nhớ bao nhi&ecirc;u chữ. Ad đ&atilde; chỉ ra bộ thủ trong từng b&agrave;i, từng chữ H&aacute;n đ&oacute;.</span>
        </p>
        <p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
          <strong>
            <span style="">+</span>
          </strong>
          <span style="">, V&iacute; dụ minh họa cho chữ H&aacute;n l&agrave; từ vựng thường hay sử dụng v&agrave; thiết thực. C&aacute;c bạn n&ecirc;n nhớ đa số từ vựng đ&oacute; v&agrave; khi học xong phần chữ H&aacute;n th&igrave; vốn từ vựng kh&aacute; nhiều rồi.</span>
        </p>
        <p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
          <span style="">+, Thường xuy&ecirc;n luyện những b&agrave;i tập về phần chữ H&aacute;n, Ad cũng đ&atilde; tổng hợp luyện đề theo chữ H&aacute;n ri&ecirc;ng.</span>
        </p>
        <p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
          <strong>
            <span style="">+</span>
          </strong>
          <span style="">, Cố gắng l&agrave;m hết b&agrave;i tập trắc nghiệm sau mỗi b&agrave;i, khi học b&agrave;i mới th&igrave; h&atilde;y 1 lần nữa &ocirc;n lại b&agrave;i cũ. Sau 10 ng&agrave;y th&igrave; &ocirc;n lại, sau 1 th&aacute;ng lại &ocirc;n tổng hợp.</span>
        </p>
        <p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
          <strong>
            <span style="">+</span>
          </strong>
          <span style="">, Cố gắng nhớ &acirc;m H&aacute;n Việt v&agrave; nghĩa của n&oacute;, hiểu n&oacute; th&igrave; c&aacute;c bạn c&oacute; thể tự gh&eacute;p được từ vựng mới.</span>
        </p>
        <p style="margin-top:0pt; margin-bottom:10pt; text-align:justify; line-height:150%; font-size:14pt;">
          <strong>
            <span style="">+</span>
          </strong>
          <span style="">, Xác định mỗi 2 ng&agrave;y chỉ học 10 chữ H&aacute;n m&agrave; Ad đ&atilde; soạn trong 1 b&agrave;i. Chậm nhưng chắc, 2 ng&agrave;y 10 từ, 20 ng&agrave;y chắc chắn c&oacute; 100 từ. Chữ H&aacute;n từ N5 đến N1 chỉ c&oacute; gần 2000 từ th&ocirc;i. C&aacute;c bạn thử t&iacute;nh gi&uacute;p Ad l&agrave; bao nhi&ecirc;u l&acirc;u học xong chữ H&aacute;n từ N5 đến N1 nh&eacute;. Tuy nhi&ecirc;n nếu kh&ocirc;ng &ocirc;n lại nhiều lần th&igrave; sẽ bị qu&ecirc;n.</span>
        </p>
        <p style="margin-top:0pt; margin-bottom:10pt; text-align:right; line-height:150%; font-size:14pt;"> Ch&uacute;c c&aacute;c bạn sớm nhớ nhanh chữ H&aacute;n ! </p>
        <p style="margin-top:0pt; margin-bottom:10pt; text-align:right; line-height:150%; font-size:14pt;"> Admin&nbsp;&nbsp; </p>
      </div>
      <br />
    </main>
  </body>
</html>`,
      }}
    />
  );
};
