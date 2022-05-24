import '../styles/globals.css'
import NextNProgress from "nextjs-progressbar";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {

  const { Component, pageProps } = props
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <CacheProvider value={clientSideEmotionCache}>

          <ThemeProvider theme={theme}>
            <NextNProgress
              color="#29D"
              startPosition={0.3}
              stopDelayMs={200}
              height={3}
              showOnShallow={true}
            />
            {/* CssBaseline kickstart an elegant, 
                consistent, and simple baseline to
                build upon. */}
            <CssBaseline />
            < Component {...pageProps} />
          </ThemeProvider>
        </CacheProvider>
      </Hydrate>
    </QueryClientProvider>

  )
}
