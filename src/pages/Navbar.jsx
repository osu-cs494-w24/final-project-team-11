import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import BetClashLogo from '../assets/BetClashLogo.jpg';
import myProfilePic from '../assets/myProfilePic.jpg';
import { FaUser, FaBell, FaBars, FaTimes } from 'react-icons/fa';

const Header = styled.header`
    background-color: #1c1c1c;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-family: 'Roboto', sans-serif;
    z-index: 999;
`;

const Logo = styled.img`
    height: 50px;
    width: auto;
    margin-left: auto;
`;

const Nav = styled.nav`
    position: fixed;
    top: 0;
    left: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    width: 250px;
    height: 100%;
    background-color: #1c1c1c;
    transition: left 0.3s;
    padding: 80px 20px 20px;
    z-index: 998;
`;

const NavList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const NavLinkStyled = styled(NavLink)`
    color: #ffffff;
    text-decoration: none;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 500;
    transition: color 0.3s;
    display: block;

    &:hover {
        color: #ffcc00;
    }

    &.active {
        color: #ffcc00;
    }
`;

const UserProfile = styled.div`
    display: flex;
    align-items: center;
    color: #ffffff;
    margin-top: 30px;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
        color: #ffcc00;
    }
`;
const UserAvatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
`;

const UserName = styled.span`
    font-weight: 500;
`;

const NotificationIcon = styled(FaBell)`
    font-size: 24px;
    color: #ffffff;
    margin-top: 20px;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
        color: #ffcc00;
    }
`;

const HamburgerButton = styled.button`
    background: none;
    border: none;
    color: #ffffff;
    font-size: 24px;
    cursor: pointer;
    margin-right: 20px;
`;

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Header>
                <HamburgerButton onClick={toggleMenu}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </HamburgerButton>
                <Logo src={BetClashLogo} alt="BetClash Logo" />
            </Header>
            {isOpen && (
                <Nav isOpen={isOpen}>
                    <NavList> 
                      
                      <NavLinkStyled to="/profile" activeClassName="active" onClick={toggleMenu}>
                    <UserProfile>
                        <UserAvatar src= {myProfilePic} alt="Profile" />
                        <UserName>Rob Hess</UserName>
                    </UserProfile>
                        </NavLinkStyled>
                        <NavLinkStyled exact to="/" activeClassName="active" onClick={toggleMenu}>
                            Home
                        </NavLinkStyled>
                        
                        <NavLinkStyled to="/friends" activeClassName="active" onClick={toggleMenu}>
                            Friends
                        </NavLinkStyled>
                        <NavLinkStyled to="/livescores" activeClassName="active" onClick={toggleMenu}>
                            Live Scores
                        </NavLinkStyled>
                    </NavList>

                   


                    
                    <NotificationIcon />
                </Nav>
            )}
            <Outlet />
        </>
    );
}