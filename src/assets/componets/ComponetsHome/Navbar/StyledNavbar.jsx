import { useState } from 'react';
import styled from 'styled-components'
import { Link } from "react-router-dom";

const StyleHeader = styled.header`
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: #111;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  backdrop-filter: blur(5px);

   @media(max-width: 768px){
    padding: 0 20px;
  }
`;

const StyleNav = styled.nav`
  ul {
    display: flex;
    list-style: none;
    gap: 30px;

    @media(max-width: 768px){
      display: ${({ open }) => open ? 'flex' : 'none'};
      position: absolute;
      top: 100px;
      right: 0;
      background: #fff;
      width: 100%;
      flex-direction: column;
      gap: 20px;
      padding: 20px 0;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
  }

  a {
    text-decoration: none;
    color: #fff;
    font-size: 16px;
    padding: 20px 30px;
  }

    a::after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    left: 0;
    bottom: -1px;
    background-color: #4facfe; /* azul neon */
    transition: width 0.3s;
  }

  a:hover::after {
    width: 100%;
  }

  a:hover,
  a.active {
    background: #3d3d3c;
    border-radius: 5px;
    transition: 0.3s;
  }
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  flex-direction: column;
  gap: 5px;

  span {
    width: 25px;
    height: 3px;
    background: black;
  }

  @media(max-width: 768px){
    display: flex;
  }
`;

export default function StyledNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <StyleHeader>
        <Hamburger onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </Hamburger>
        <StyleNav open={menuOpen}>
          <ul>
            <Link to="/home#Home">Home</Link><br />
            <Link to="/home#Valores">Valores</Link><br />
            <Link to="/home#SobreNos">Sobre nós</Link><br />
            <Link to="/home#Galeria">Galeria</Link><br />
            <Link to="/login">Login</Link>
          </ul>
        </StyleNav>
      </StyleHeader>
    </>
  );
}