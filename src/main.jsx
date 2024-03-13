import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Global, css } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BettingProvider } from './components/BettingContext';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Friends } from './pages/Friends';
import { LiveScores } from './pages/LiveScores';
import { MainLayout } from './MainLayout';
import { BetConfirmation } from './components/BetConfirmation'; // Adjusted import path
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
            // Removed PlaceBet route, assuming it's used within the Friends component or as a modal
            { path: "bet-confirmation", element: <BetConfirmation /> }, // Updated path
        ],
    },
]);

const queryClient = new QueryClient();

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css?family=Muli');
  body {
    font-family: 'Muli', sans-serif;
    margin: 0;
    background-color: black;
    color: white;
  }
`;

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Global styles={globalStyles} />
            <BettingProvider>
                <RouterProvider router={router} />
            </BettingProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
