import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
    background-color: #83868a;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1000;
`;

const Logo = styled.h1 `
    font-size: 1.5rem;
    margin: 0;
`;

const Nav = styled.nav`
    @media (max-width: 768px) {
        display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
        position: absolute;
        top: 50px;
        left: 0;
        width: 100%;
        background-color: #343a40;
        padding: 10px 0;
    }
`;

const NavList = styled.ul`
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const NavItem = styled.li`
    margin: 0 10px;

    @media (max-width: 768px) {
        margin: 10px 0;
    }
`;

const NavLink = styled(Link)`
    color: white;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;


const Burger = styled.div`
    display: none;
    cursor: pointer;

    @media (max-width: 768px) {
        display: block;
    }

    div {
        width: 25px;
        height: 3px;
        background-color: white;
        margin: 5px;
        transition: all 0.3s ease;
    }
`;

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <HeaderContainer>
            <Logo>게시판</Logo>
            <Burger onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </Burger>
            <Nav $isOpen={isOpen}> {/* 대문자면 DOM 에러 발생 */}
                <NavList>
                    <NavItem>
                        <NavLink to="/">홈</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="#">None</NavLink>
                    </NavItem>
                </NavList>
            </Nav>
        </HeaderContainer>
    );
};

export default Header;
