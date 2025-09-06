import styled from 'styled-components';
import logo from '../../../img/logo.jpg';

const StyleBanner = styled.section`
  width: 100%;
  height: 80vh;
  background-image: url(${logo});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  color: white;
`;

const Title = styled.h1`
  font-size: 3rem;
  background-color: rgba(255, 255, 255, 0.8);
  color: black;
  padding: 10px 20px;
  border-radius: 10px;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-top: 1px;
`;

const ContactButton = styled.a`
  margin-top: 1px;
  background: white;
  color: black;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  border: 1px solid black;

  &:hover {
    background: #eee;
  }
`;

export default function StyledBanner() {
  return (
    <StyleBanner id="Home">
      <Title>Bem vindo ao EnriCar</Title>
      <Subtitle>Seu carro com limpeza total!</Subtitle>
      <ContactButton href="#Contato">📩 Contanto </ContactButton>
    </StyleBanner>
  );
}