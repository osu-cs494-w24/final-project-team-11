import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import BetClashLogo from '../assets/BetClashLogo.jpg';
import { FaUser, FaBell } from 'react-icons/fa';

const Header = styled.header`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
  background-color: #1c1c1c;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
  z-index: 999;
`;

const Logo = styled.img`
  height: 50px;
  width: auto;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
`;

const NavLinkStyled = styled(NavLink)`
  color: #ffffff;
  text-decoration: none;
  padding: 10px 15px;
  margin-right: 10px;
  font-weight: 500;
  position: relative;
  transition: color 0.3s;

  &:hover {
    color: #ffcc00;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #ffcc00;
    transform: scaleX(0);
    transition: transform 0.3s;
  }

  &.active {
    color: #ffcc00;

    &::after {
      transform: scaleX(1);
    }
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  color: #ffffff;
  margin-left: 20px;
  cursor: pointer;
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
  font-size: 20px;
  color: #ffffff;
  margin-left: 20px;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #ffcc00;
  }
`;

export function Navbar({ children }) {
  return (
    <>
      <Header>
        <Logo src={BetClashLogo} alt="BetClash Logo" />
        <Nav>
          <NavList>
            <NavLinkStyled exact to="/" activeClassName="active">
              Home
            </NavLinkStyled>
            <NavLinkStyled to="/profile" activeClassName="active">
              Profile
            </NavLinkStyled>
            <NavLinkStyled to="/friends" activeClassName="active">
              Friends
            </NavLinkStyled>
            <NavLinkStyled to="/livescores" activeClassName="active">
              Live Scores
            </NavLinkStyled>
          </NavList>
          <UserProfile>
            <UserAvatar src="path/to/user/avatar.jpg" alt="User Avatar" />
            <UserName>John Doe</UserName>
          </UserProfile>
          <NotificationIcon />
        </Nav>
      </Header>
      <Outlet />
    </>
  );
}