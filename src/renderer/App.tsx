import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { ErrorBoundary } from 'react-error-boundary';
import MainPageComponent from '../components/MainPageView/MainPageComponent';
import mantineTheme from './theme';
import '@mantine/core/styles.css';

export default function App() {
  return (
    <>
      <ColorSchemeScript forceColorScheme="dark" />
      <MantineProvider theme={mantineTheme} forceColorScheme="dark">
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <MainPageComponent />
        </ErrorBoundary>
      </MantineProvider>
    </>
  );
}
