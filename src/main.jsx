import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Global, css } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import { BettingProvider } from './components/BettingContext';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Friends } from './pages/Friends';
import { LiveScores } from './pages/LiveScores';
import { MainLayout } from './MainLayout';
import { BetConfirmation } from './components/BetConfirmation';
import store from './redux/store'; // Corrected import path
import { ErrorPage } from './pages/ErrorPage';

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
  @import url('https://fonts.googleapis.com/css?family=Fredoka');
  body {
    font-family: "Fredoka", sans-serif;
    margin: 0;
    background-color: black;
    color: white;
  }
`;

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Global styles={globalStyles} />
            <Provider store={store}> {/* Use Redux Provider here */}
                <BettingProvider>
                    <RouterProvider router={router} />
                </BettingProvider>
            </Provider>
        </QueryClientProvider>
    </React.StrictMode>
);