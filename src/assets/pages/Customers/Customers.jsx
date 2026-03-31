import StyledNavbarDash from "../../componets/ComponetsDashbord/StyledNavbarDash";
import StyledCustumers from "../../componets/ComponetsCustumers/StyledCustumers";
import { DashboardContainer } from "../../componets/ComponetsDashbord/DashboardContainer";

export default function Customers() {
  return (
    <DashboardContainer>
      <StyledNavbarDash />
      <StyledCustumers />
    </DashboardContainer>
  );
}