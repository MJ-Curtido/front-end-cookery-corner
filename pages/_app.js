import '../styles/globals.css';
import { theme } from '../utils/theme';
import { ThemeProvider } from '@mui/material';
import createEmotionCache from '../utils/createEmotionCache';
import { CacheProvider } from '@emotion/react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, emotionCache = clientSideEmotionCache, pageProps }) {
    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </CacheProvider>
    );
}
