import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
    display: flex; // 가로방향 배치
    background-color: #83868a;
    color: white;
    align-items: center;
    justify-content: space-between;
`;

const Title = styled.h1 `
    margin-left:20px;
`;

const Nav = styled.nav`
    display: flex;
    justify-content:  space-between;
    align-items: center;
`;

const NavLink = styled(Link)`
    color: white;
    margin: 0 15px;
    text-decoration: none;
    font-size: 1.2rem;
    transition: color 0.3s;

    &:hover {
        color: #adb5bd;
    }
`;

const Header = () => {
    return (
        <HeaderContainer>
            <Title>게시판</Title>
            <Nav>
                <NavLink to="/">홈</NavLink>
                <NavLink to="/#">예시1</NavLink>
                <NavLink to="/#">예시2</NavLink>
                <NavLink to="/#">예시3</NavLink>
            </Nav>
        </HeaderContainer>
    );
};

export default Header;
