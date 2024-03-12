import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const Header = styled.header`
    background-color: rgb(78, 78, 80);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100px;
    display: flex;
    align-items: center;
    box-shadow: 0 0 8px 0 black;
    * {
        display: inline;
    }
`;

const Logo = styled.img`
    height: 100px;
    width: 110px;
`;

const Nav = styled.nav`
`;

const NavList = styled.ul`
    list-style: none;
    padding: 0;
`;

const NavLinkStyled = styled(NavLink)`
    display: inline;
    padding: 40px; /* Adjust the padding as needed */
    
    &:hover {
        background-color: rgb(255, 128, 0);
    }
    color: white;
    text-decoration: none;
`;
const Main = styled.main`
    color: white;
`;

export function Navbar({ children }) {
    return (
        <>
            <Header>
                <Logo src="../assets/BetClashLogo.jpg" />
                <Nav>
                    <NavList>
                        <NavLinkStyled to="/">Home</NavLinkStyled>
                        <NavLinkStyled to="/profile">Profile</NavLinkStyled>
                        <NavLinkStyled to="/friends">Friends</NavLinkStyled>
                        <NavLinkStyled to="/livescores">Live Scores</NavLinkStyled>
                    </NavList>
                </Nav>
            </Header>
        </>
    );
}