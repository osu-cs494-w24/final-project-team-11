import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Global, css } from '@emotion/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { Friends } from './pages/Friends'
import { LiveScores } from './pages/LiveScores'
import { Navbar } from './pages/Navbar'
import { ErrorPage } from './pages/ErrorPage'
import { MainLayout } from './MainLayout';

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
        ]
    },
])

const queryClient = new QueryClient()

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css?family=Muli');
  body {
    font-family: 'Muli', sans-serif;
    margin: 0;
    background-color: black;
    color:white;
  }
`

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
        <Global styles={globalStyles} />
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>
)
