import { NavLink, Outlet } from 'react-router-dom'

export function Navbar(props) {
    const { children } = props
    return (
        <>
            <nav>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/profile">Profile</NavLink></li>
                    <li><NavLink to="/friends">Friends</NavLink></li>
                    <li><NavLink to="/livescores">Live Scores</NavLink></li>
                </ul>
            </nav>
            <main>{children || <Outlet />}</main>
        </>
    )
}