import styled from "styled-components";
import image from "../../../img/image.png"

const StyledContainer = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px;
  background-color: white;
  gap: 30px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`

const StyledImage = styled.div`
  flex: 1;
  img {
    width: 70%;
    height: auto;
    border-radius: 8px;
    object-fit: cover;
    transition: transform 0.6s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
`

const StyledContent = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  right: 150px;
`

const StyledTitle = styled.h1`
  font-size: 28px;
  font-weight: bold;
`

const StyledSubtitle = styled.h3`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 15px;
`

const Styledtext = styled.p`
  line-height: 1.6;
  margin-bottom: 15px;
`

const StyledHighlight = styled.p`
  color: #0056d2;
  font-weight: bold;
  margin-bottom: 20px;
`

const StyledContact = styled.div`
  font-size: 14px;
  margin-bottom: 20px;
`

export default function StyledMain() {
    return (
        <StyledContainer id="Sobre nós">
            <StyledImage>
                <img src={image} alt="Enricar" />
            </StyledImage>

            <StyledContent>
                <StyledTitle>Sobre EnriCar</StyledTitle>
                <StyledSubtitle>Lavagem manual e detalhamento de carros</StyledSubtitle>

                <Styledtext>Bem-vindo à EnriCar, onde redefinimos a arte de cuidar de carros <br /> com nossos serviços incomparáveis de lavagem manual. Na EnriCar, <br /> acreditamos em mais do que apenas limpar veículos; acreditamos em <br /> realçar e preservar sua beleza, um detalhe meticuloso de cada vez.
                </Styledtext>

                <Styledtext>Na EnriCar, nossa missão não é apenas limpar carros; é elevar <br /> toda a experiência de cuidar de um carro. Somos movidos pela paixão, <br /> guiados pela integridade e dedicados a fazer cada veículo brilhar
                </Styledtext>

                <StyledHighlight>
                    – porque acreditamos que cada viagem merece ser uma obra-prima.
                </StyledHighlight>

                <StyledContact>
                    <p>📍 Elizabeth Shopping Centre, Next To Coles, Adelaide, SA, Australia</p>
                    <p>📞 +61 433 457 269</p>
                    <p>📧 washmasterelizabeth@gmail.com</p>
                </StyledContact>
            </StyledContent>
        </StyledContainer>
    )
}