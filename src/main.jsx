// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Global, css } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BettingProvider } from './components/BettingContext';
// Individual imports instead of aggregated import from './pages'
import Home from './pages/Home';
import Profile from './pages/Profile';
import Friends from './pages/Friends';
import LiveScores from './pages/LiveScores';
import BetConfirmation from './components/BetConfirmation';
import ErrorPage from './pages/ErrorPage';
import { MainLayout } from './MainLayout';
import { ThemeProvider } from './components/ThemeContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "profile", element: <Profile /> },
      { path: "friends", element: <Friends /> },
      { path: "livescores", element: <LiveScores /> },
      { path: "bet-confirmation", element: <BetConfirmation /> },
    ],
  },
]);

const queryClient = new QueryClient();

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css?family=Muli');
  :root {
    --background-color: #121212;
    --text-color: #FFFFFF;
  }
  body {
    font-family: 'Muli', sans-serif;
    margin: 0;
    background-color: var(--background-color);
    color: var(--text-color);
  }
`;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Global styles={globalStyles} />
          <BettingProvider>
        
            <RouterProvider router={router} />
          </BettingProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
