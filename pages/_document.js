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
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={''} />
          <link rel="stylesheet" href="https://unpkg.com/normalize.css@8.0.1/normalize.css" />
          <NextScript />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function (d, w, c) {
                (w[c] = w[c] || []).push(function() {
                    try {
                        w.yaCounter68012902 = new Ya.Metrika({
                            id:68012902,
                            clickmap:true,
                            trackLinks:true,
                            accurateTrackBounce:true,
                            webvisor:true,
                            ecommerce:"dataLayer"
                        });
                    } catch(e) {
                      console.error(e)
                     }
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
            window.dataLayer = window.dataLayer || [];
              `,
            }}
          />
          <noscript>
            <div>
              <img src="https://mc.yandex.ru/watch/68012902" style={{ position: 'absolute', left: -9999 }} alt="" />
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
