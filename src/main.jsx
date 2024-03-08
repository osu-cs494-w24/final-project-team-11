import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { Friends } from './pages/Friends'
import { LiveScores } from './pages/LiveScores'
import { Navbar } from './pages/Navbar'
import { ErrorPage } from './pages/ErrorPage'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navbar />,
        errorElement: <Navbar><ErrorPage /></Navbar>,
        children: [
            { index: true, element: <Home /> },
            { path: "profile", element: <Profile /> },
            { path: "friends", element: <Friends /> },
            { path: "livescores", element: <LiveScores /> },
        ]
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
