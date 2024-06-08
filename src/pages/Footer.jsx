import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
    background-color: #83868a;
    color: white;
    /* padding: 10px 0; */
    text-align: center;
    flex-shrink: 0; /* Ensure footer does not shrink */
`;

const Footer = () => {
    return (
        <FooterContainer>
            <p>&copy; 2024 게시판</p>
        </FooterContainer>
    );
};

export default Footer;
