import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [...initialProps.styles, ...sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="ru">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <NextScript />
          <script
            // dangerouslySetInnerHTML={{
            //   __html: `
            //   (function (d, w, c) {
            //     (w[c] = w[c] || []).push(function() {
            //         try {
            //             w.yaCounter68012902 = new Ya.Metrika({
            //                 id:68012902,
            //                 clickmap:true,
            //                 trackLinks:true,
            //                 accurateTrackBounce:true,
            //                 webvisor:true,
            //                 ecommerce:"dataLayer"
            //             });
            //         } catch(e) {
            //           console.error(e)
            //          }
            //     });

            //     var n = d.getElementsByTagName("script")[0],
            //         x = "https://mc.yandex.ru/metrika/watch.js",
            //         s = d.createElement("script"),
            //         f = function () { n.parentNode.insertBefore(s, n); };
            //     for (var i = 0; i < document.scripts.length; i++) {
            //         if (document.scripts[i].src === x) { return; }
            //     }
            //     s.type = "text/javascript";
            //     s.async = true;
            //     s.src = x;

            //     if (w.opera == "[object Opera]") {
            //         d.addEventListener("DOMContentLoaded", f, false);
            //     } else { f(); }
            // })(document, window, "yandex_metrika_callbacks");
            // window.dataLayer = window.dataLayer || [];
            //   `,
            // }}
            dangerouslySetInnerHTML={{
              __html: `
                (function (d, w, c) {
                  (w[c] = w[c] || []).push(function() {
                      try {
                          w.yaCounter91593418 = new Ya.Metrika({
                              id:91593418,
                              clickmap:true,
                              trackLinks:true,
                              accurateTrackBounce:true,
                              webvisor:true,
                              ecommerce:"dataLayer"
                          });
                      } catch(e) { }
                  });
          
                  var n = d.getElementsByTagName("script")[0],
                      x = "https://mc.yandex.ru/metrika/watch.js",
                      s = d.createElement("script"),
                      f = function () { n.parentNode.insertBefore(s, n); };
                  for (var i = 0; i < document.scripts.length; i++) {
                      if (document.scripts[i].src === x) { return; }
                  }
                  s.type = "text/javascript";
                  s.async = true;
                  s.src = x;
          
                  if (w.opera == "[object Opera]") {
                      d.addEventListener("DOMContentLoaded", f, false);
                  } else { f(); }
              })(document, window, "yandex_metrika_callbacks");
              `,
            }}
          />
          <noscript>
            <div>
              <img src="https://mc.yandex.ru/watch/91593418" style={{ position: 'absolute', left: -9999 }} alt="" />
            </div>
          </noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
