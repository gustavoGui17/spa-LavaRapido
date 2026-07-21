import styled from 'styled-components';
import StyledCard from './StyledCard';

const StyleSection = styled.section`
  text-align: center;
  padding: 50px;
`;

const StyleCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
`;

export default function StyledPricing() {
  
  const plans = [
  {
    title: ' Lavagem simples ',
    car: 'MOTOCICLETA',
    bgColor: '#8bc34a',
    price: 50.00, 
    washing: 'Lavagem para motocicleta',
    service:['Lavagem Exterior', 'Lavagem por fora'] 
  },
  { 
    title: ' Lavagem basica ',
    car: 'HETCH/SUV/CAMINHONETE',
    bgColor: '#2196f3',
    price: 50.00, 
    washing: 'Lavagem simples',
    service:['Lavagem Exterior', 'Lavagem por fora']
   },
  { 
    title: ' Lavagem deluxe ',
    car: 'HETCH/SUV/CAMINHONETE',
    bgColor: '#fbc02d', 
    price: 80.00, 
    washing: 'Lavagem com cera',
    service:['Lavagem Exterior', 'Lavagem por fora', 'Cera'] 
  },
  { 
    title: ' Lavagem ultimate ', 
    car: 'HETCH/SUV/MOTO/CAMINHONETE',
    bgColor: '#1976d2',
    price: 100.00, 
    washing: 'Lavagem completa com polimento',
    service:['Lavagem Exterior', 'Lavagem por fora', 'Polimento']
  },
  { 
    title: ' Lavagem super ',
    car: 'HETCH/SUV/CAMINHONETE',
    bgColor: '#388e3c',
    price: 150.00,
    washing: 'Lavagem completa com polimento e cera',
    service:['Lavagem Exterior', 'Lavagem por fora', 'Polimento', 'cera']
  },
  { 
    title: ' Lavagem premium ',
    car: 'HETCH/SUV/CAMINHONETE/MOTOCICLETA',
    bgColor: '#ff9800',
    price: 250.00, 
    washing: 'Lavagem detalhada',
    service:['Lavagem Exterior', 'Lavagem por fora', 'Polimento', 'cera', 'Lavagem detalhada']
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
            bgColor={plan.bgColor}
            price={plan.price}
            service={plan.service}
          />
        ))}
      </StyleCardsContainer>
    </StyleSection>
  );
}