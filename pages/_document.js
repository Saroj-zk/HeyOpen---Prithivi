import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '@/utils/createEmotionCache';
import theme from '@/theme/theme';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content={theme.palette.background.default} />
          {/* The tab icon is the omega on its own. Everywhere a reader can
              see the brand it is the whole wordmark, but this slot is
              square and as small as 16px, where a 4.5:1 wordmark is
              unreadable. Each size is cut from the master rather than
              left to the browser to shrink, and favicon.ico exists so the
              browser's own unprompted request for it does not 404. */}
          <link rel="icon" href="/brand/heyopen-mark-32.png" sizes="32x32" type="image/png" />
          <link rel="icon" href="/brand/heyopen-mark.png" sizes="256x256" type="image/png" />
          <link rel="apple-touch-icon" href="/brand/heyopen-mark-180.png" sizes="180x180" />
          <link rel="alternate icon" href="/favicon.ico" sizes="48x48" />
          {/* Open Graph base tags — overridden per-page */}
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="HeyOpen" />
          <meta property="og:image" content="https://openledger.xyz/og-image.png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@OpenLedger_" />
          <meta name="twitter:image" content="https://openledger.xyz/og-image.png" />
          {/* Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,600;1,600&family=Geist:wght@400;500;600&family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400;1,500&family=Roboto+Mono:wght@400;500;600&display=swap"
            rel="stylesheet"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  function isExtError(e) {
                    var msg = (e && (e.message || e.reason || '')) + '';
                    var stack = (e && e.stack) || '';
                    return msg.indexOf('MetaMask') !== -1 ||
                           msg.indexOf('Failed to connect to MetaMask') !== -1 ||
                           stack.indexOf('chrome-extension://') !== -1 ||
                           stack.indexOf('moz-extension://') !== -1;
                  }
                  window.addEventListener('unhandledrejection', function(event) {
                    if (isExtError(event.reason)) {
                      event.preventDefault();
                      event.stopImmediatePropagation();
                    }
                  }, true);
                  window.addEventListener('error', function(event) {
                    if (isExtError(event.error) || (event.filename && event.filename.indexOf('extension://') !== -1)) {
                      event.preventDefault();
                      event.stopImmediatePropagation();
                    }
                  }, true);
                })();
              `,
            }}
          />
          <meta name="emotion-insertion-point" content="" />
          {this.props.emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
