import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme, lightTheme } from './theme';
import { useTheme as useThemeMode } from './hooks/useTheme';
import ErrorBoundary from './components/common/ErrorBoundary';
import AppRoutes from './routes';

export default function App() {
  const { mode } = useThemeMode();
  const theme = mode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
