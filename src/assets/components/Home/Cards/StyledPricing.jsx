import styled from 'styled-components';
import StyledCard from './StyledCard';

const StyleSection = styled.section`
  text-align: center;
  padding: 60px 20px;
  background: var(--color-background);
`;

const StyleCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  max-width: 1200px;
  padding: 0 40px;
  margin: 40px auto 0;
`;

export default function StyledPricing() {

  const plans = [
  {
    title: 'Simples',
    car: 'Motocicleta',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    price: 50.00,
    washing: 'Lavagem para motocicleta',
    service:['Lavagem Exterior', 'Lavagem por fora']
  },
  {
    title: 'Básica',
    car: 'Hatch / SUV / Caminhonete',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    price: 50.00,
    washing: 'Lavagem simples',
    service:['Lavagem Exterior', 'Lavagem por fora']
  },
  {
    title: 'Deluxe',
    car: 'Hatch / SUV / Caminhonete',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    price: 80.00,
    washing: 'Lavagem com cera',
    service:['Lavagem Exterior', 'Lavagem por fora', 'Cera']
  },
  {
    title: 'Ultimate',
    car: 'Hatch / SUV / Moto / Caminhonete',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    price: 100.00,
    washing: 'Lavagem completa com polimento',
    service:['Lavagem Exterior', 'Lavagem por fora', 'Polimento']
  },
  {
    title: 'Super',
    car: 'Hatch / SUV / Caminhonete',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    price: 150.00,
    washing: 'Lavagem completa com polimento e cera',
    service:['Lavagem Exterior', 'Lavagem por fora', 'Polimento', 'Cera']
  },
  {
    title: 'Premium',
    car: 'Hatch / SUV / Caminhonete / Moto',
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    price: 250.00,
    washing: 'Lavagem detalhada',
    service:['Lavagem Exterior', 'Lavagem por fora', 'Polimento', 'Cera', 'Lavagem detalhada']
  }
];

  return (
    <StyleSection id='Valores'>
      <h2>Preços</h2>
      <p>
        Confira abaixo os preços dos nossos serviços.
      </p>
      <StyleCardsContainer>
        {plans.map((plan, index) => (
          <StyledCard
            key={index}
            title={plan.title}
            car={plan.car}
            washing={plan.washing}
            gradient={plan.gradient}
            price={plan.price}
            service={plan.service}
          />
        ))}
      </StyleCardsContainer>
    </StyleSection>
  );
}