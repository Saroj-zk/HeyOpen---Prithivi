import * as React from 'react';
import Head from 'next/head';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '@/theme/theme';
import createEmotionCache from '@/utils/createEmotionCache';
import SmoothScroll from '@/components/SmoothScroll';
import { ThemeProvider } from '@/context/ThemeContext';
import '@/styles/globals.css';
import 'lenis/dist/lenis.css';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  React.useEffect(() => {
    const isIgnoredError = (err) => {
      if (!err) return false;
      const message = typeof err === 'string' ? err : err.message || '';
      const stack = err.stack || '';
      return (
        message.includes('MetaMask') ||
        message.includes('Failed to connect to MetaMask') ||
        message.includes('listener indicated an asynchronous response') ||
        message.includes('message channel closed') ||
        stack.includes('chrome-extension://') ||
        stack.includes('moz-extension://') ||
        stack.includes('safari-web-extension://')
      );
    };

    const handleUnhandledRejection = (event) => {
      if (isIgnoredError(event.reason)) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };

    const handleError = (event) => {
      if (
        isIgnoredError(event.error) ||
        (event.filename &&
          (event.filename.includes('extension://') || event.filename.includes('inpage.js')))
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection, true);
    window.addEventListener('error', handleError, true);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection, true);
      window.removeEventListener('error', handleError, true);
    };
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        {/* No title here any more. Every page states its own through
            PageMeta, and a title in _app is a second one competing with it:
            Next keeps the last to render, which made which title won depend
            on render order rather than on the page. The old fallback also
            said "AI-Powered Infrastructure" while the home page said "AI
            Assistant", so the site shipped two descriptions of itself. */}
        <link rel="icon" href="/openchat_icon_mark.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
      </Head>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <ThemeProvider>
          <SmoothScroll>
            <Component {...pageProps} />
          </SmoothScroll>
        </ThemeProvider>
      </MuiThemeProvider>
    </CacheProvider>
  );
}
