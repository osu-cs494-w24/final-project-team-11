import {  Outlet } from 'react-router-dom'

export function LiveScores() {
    return (
        <>
            <p id="hometext">This is the livescores page</p>
            <main><Outlet /> </main>
        </>
    )
}