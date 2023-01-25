import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

const yaMetrikaId = process.env.YANDEX_METRIKA_ID;

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
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={''} />
          <link rel="icon" href="/favicon.ico" />
          <NextScript />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function (d, w, c) {
                  (w[c] = w[c] || []).push(function() {
                      try {
                          w.yaCounter${yaMetrikaId} = new Ya.Metrika({
                              id:${yaMetrikaId},
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
              <img
                src={'https://mc.yandex.ru/watch/' + yaMetrikaId}
                style={{ position: 'absolute', left: -9999 }}
                alt=""
              />
            </div>
          </noscript>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                 (function(w,d,n,c){w.CalltouchDataObject=n;w[n]=function(){w[n]["callbacks"].push(arguments)};if(!w[n]["callbacks"]){w[n]["callbacks"]=[]}w[n]["loaded"]=false;if(typeof c!=="object"){c=[c]}w[n]["counters"]=c;for(var i=0;i<c.length;i+=1){p(c[i])}function p(cId){var a=d.getElementsByTagName("script")[0],s=d.createElement("script"),i=function(){a.parentNode.insertBefore(s,a)},m=typeof Array.prototype.find === 'function',n=m?"init-min.js":"init.js";s.async=true;s.src="https://mod.calltouch.ru/"+n+"?id="+cId;if(w.opera=="[object Opera]"){d.addEventListener("DOMContentLoaded",i,false)}else{i()}}})(window,document,"ct","4p63ahxk");
            `,
            }}
          />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
              var _paq = window._paq = window._paq || []; _paq.push(['trackPageView']); _paq.push(['enableLinkTracking']); (function() { var u="Sign in - Matomo "; _paq.push(['setTrackerUrl', u+'matomo.php']); _paq.push(['setSiteId', '2']); var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0]; g.type='text/javascript'; g.async=true; g.src='https://matomo.vobaza.ru/matomo.js'; s.parentNode.insertBefore(g,s); })();
            `,
            }}
          />
          <noscript>
            <p><img src="https//matomo.vobaza.ru/matomo.php?idsite=2&rec=1" style={{ border: 0 }} alt="" /></p>
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
