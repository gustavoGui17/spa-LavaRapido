import styled from "styled-components"

const Section = styled.section`
  padding: 60px 40px;
  text-align: center;
  background: #fff;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 40px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  display: flex;
  align-items: flex-start;
  text-align: left;
  gap: 12px;
`;

const Icon = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: black;
`;

const Content = styled.div`
  h3 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  p {
    font-size: 14px;
    color: #444;
    line-height: 1.4;
  }
`;

export default function StyledCarDetaling() {
  const features = [
    {
      title: "20 anos de experiencia",
      text: "20 anos de experiência no setor em parceria oficial com concessionárias de luxo."
    },
    {
      title: "Atenção aos detalhes",
      text: "Enfatize a atenção meticulosa que sua equipe dedica a cada veículo."
    },
    {
      title: "Atendimento Personalizado",
      text: "Ofereça serviços adicionais, como detalhamento de interiores ou solicitações específicas de limpeza."
    },
    {
      title: "Conveniência do cliente",
      text: "Ofereça serviços adicionais, como coleta e entrega, ou serviços móveis de lavagem de carros."
    },
    {
      title: "Eficiência de tempo",
      text: "Destaque a eficiência de tempo de uma lavagem manual de carros em comparação com lavagens automáticas."
    },
    {
      title: "Preços Transparentes",
      text: "Descreva claramente sua estrutura de preços para facilitar a compreensão dos clientes."
    },
  ];

  return (
    <Section>
      <Title>Carro detalhado em Osasco | Enricar</Title>
      <Grid>
        {features.map((feature, index) => (
          <Card key={index}>
            <Icon>│</Icon>
            <Content>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </Content>
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
