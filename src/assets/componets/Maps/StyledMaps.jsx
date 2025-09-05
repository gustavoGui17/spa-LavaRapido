import React from "react";
import styled from "styled-components";

const Section = styled.section`
  padding: 60px 40px;
  background: #fff;
  text-align: center;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 400px;
  margin-bottom: 30px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  background: #f9f9f9;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  
  h4 {
    margin-bottom: 10px;
    font-weight: bold;
    color: #0d47a1;
  }

  p {
    font-size: 14px;
    color: #444;
  }
`;

export default function StyledMaps() {
  return (
    <Section>
      <MapWrapper>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12303.307255574773!2d-46.91594363937748!3d-23.539869816211144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf069ea5263fdb%3A0x8dc84c38582d8598!2sGUINCHO%2024h%20ITAPEVI%2C%20ALEM%C3%83O%20TRANSPORTES!5e0!3m2!1spt-BR!2sbr!4v1757039893416!5m2!1spt-BR!2sbr"
          width="100%"
          height="400"
          style={{ border: 0, borderRadius: "12px" }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </MapWrapper>

      <InfoGrid>
        <InfoCard>
          <h4>📍 Endereço</h4>
          <p>Elizabeth Shopping Centre, Next To Caltex, Adelaide, SA, Australia</p>
        </InfoCard>

        <InfoCard>
          <h4>📞 Telefone e contato </h4>
          <p>+61 433 457 269<br />washmasterselizabeth@gmail.com</p>
        </InfoCard>

        <InfoCard>
          <h4>⏰ Horario de abertura </h4>
          <p>Seg-Sex (8:30 to 17:00)<br />Sabado (9:00 to 17:00)</p>
        </InfoCard>
      </InfoGrid>
    </Section>
  );
}