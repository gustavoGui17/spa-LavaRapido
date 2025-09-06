import styled from 'styled-components';

const StyleCardWrapper = styled.div`
  position: relative;
  background-color: ${({ bg }) => bg || '#fff'};
  padding: 20px;
  border-radius: 15px;
  color: #ffffff;
  width: 300px;
  margin: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyleTag = styled.div`
  background: white;
  color: #000000;
  padding: 6px 14px;
  font-weight: bold;
  border-radius: 30px;
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
`;

const StylePrice = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
`;

const StyleList = styled.ul`
  list-style: none;
  padding: 0;
`;

const StyleListItem = styled.li`
  display: flex;
  align-items: start;
  margin: 8px 0;
  font-size: 15px;
`;

const StyledCar = styled.p`
font-size: 13px;
margin-top: 25px;
`

const StyledLavagem = styled.p`
text-align: center;
`

export default function PricingCard({ title, car, bgColor, price, washing, service }) {
  return (
    <StyleCardWrapper bg={bgColor}>
      <StyleTag>{title}</StyleTag>
      <StyledCar>{car}</StyledCar>
      <StylePrice>R$ {price.toFixed(2)}</StylePrice>
      <StyledLavagem> {washing}</StyledLavagem>
      <StyleList>
        {service.map((item, index) => (
          <StyleListItem key={index}>✅ {item}</StyleListItem>
        ))}
      </StyleList>
    </StyleCardWrapper>
  );
}
