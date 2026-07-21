import styled from "styled-components";
import img1 from "../../../img/Gallery/Property 1=Frame 30.png"
import img2 from "../../../img/Gallery/Property 1=Frame 31.png"
import img3 from "../../../img/Gallery/Property 1=Frame 32.png"
import img4 from "../../../img/Gallery/Property 1=Frame 33.png"
import img5 from "../../../img/Gallery/Property 1=Frame 34.png"
import img6 from "../../../img/Gallery/Property 1=Frame 35.png"
import img7 from "../../../img/Gallery/Property 1=Frame 36.png"
import img8 from "../../../img/Gallery/Property 1=Frame 37.png"

const StyledSection = styled.section`
  padding: 60px 40px;
  text-align: center;
  background: #fff;
`;

const StyledHeader = styled.div`
  margin-bottom: 40px;

  h2 {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 15px;
  }

  p {
    font-size: 15px;
    color: #444;
    line-height: 1.5;
    max-width: 700px;
    margin: 0 auto;
  }
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ImageCard = styled.div`
  overflow: hidden;
  border-radius: 8px;

  img {
    width: 90%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

export default function StyledGallery() {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8];

  return (
    <StyledSection>
      <StyledHeader>
        <h2>Galeria</h2>
        <p>
          Bem-vindo à Enricar, onde redefinimos a arte do cuidado com o carro com nossos
          serviços incomparáveis de lavagem manual. Na Washmaster, acreditamos em mais
          do que apenas limpar veículos.
        </p>
      </StyledHeader>

      <StyledGrid>
        {images.map((src, index) => (
          <ImageCard key={index}>
            <img src={src} alt={`gallery-${index}`} />
          </ImageCard>
        ))}
      </StyledGrid>
    </StyledSection>
  );
}