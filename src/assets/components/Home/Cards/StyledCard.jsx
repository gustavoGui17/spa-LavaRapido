import styled from 'styled-components';

const StyleCardWrapper = styled.div`
  position: relative;
  background: ${({ gradient }) => gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  padding: 40px 24px 24px;
  border-radius: 20px;
  color: #ffffff;
  width: 100%;
  max-width: 340px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  }
`;

const StyleTag = styled.div`
  background: rgba(255, 255, 255, 0.95);
  color: #1a1a2e;
  padding: 6px 18px;
  font-weight: 700;
  font-size: 0.85rem;
  border-radius: 30px;
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const StyleCar = styled.p`
  font-size: 0.75rem;
  margin-top: 20px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  opacity: 0.85;
  font-weight: 500;
`;

const StylePrice = styled.p`
  font-size: 2.4rem;
  font-weight: 800;
  margin: 8px 0;
  letter-spacing: -1px;

  span {
    font-size: 1rem;
    font-weight: 500;
    opacity: 0.8;
  }
`;

const StyleWashing = styled.p`
  font-size: 0.85rem;
  text-align: center;
  opacity: 0.9;
  margin-bottom: 12px;
`;

const StyleDivider = styled.div`
  width: 40px;
  height: 3px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 2px;
  margin: 4px 0 16px;
`;

const StyleList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

const StyleListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 10px 0;
  font-size: 0.88rem;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  backdrop-filter: blur(4px);
`;

export default function PricingCard({ title, car, gradient, price, washing, service }) {
  return (
    <StyleCardWrapper gradient={gradient}>
      <StyleTag>{title}</StyleTag>
      <StyleCar>{car}</StyleCar>
      <StylePrice>
        R$ {price.toFixed(0)} <span>,{(price % 1).toFixed(2).slice(1)}</span>
      </StylePrice>
      <StyleDivider />
      <StyleWashing>{washing}</StyleWashing>
      <StyleList>
        {service.map((item, index) => (
          <StyleListItem key={index}>✓ {item}</StyleListItem>
        ))}
      </StyleList>
    </StyleCardWrapper>
  );
}
