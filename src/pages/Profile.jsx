import {  Outlet } from 'react-router-dom'

export function Profile() {
    return (
        <>
            <p id="hometext">This is profile page</p>
            <main><Outlet /> </main>
        </>
    )
}