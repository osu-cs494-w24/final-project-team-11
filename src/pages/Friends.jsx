import {  Outlet } from 'react-router-dom'

export function Friends() {
    return (
        <>
            <p id="hometext">This is the friends page</p>
            <main><Outlet /> </main>
        </>
    )
}