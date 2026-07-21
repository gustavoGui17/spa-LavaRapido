import StyledNavbarDash from "../../components/Dashbord/StyledNavbarDash";
import StyledCustomers from "../../components/Customers/StyledCustomers";
import { DashboardContainer } from "../../components/Dashbord/DashboardContainer";

export default function Customers() {
  return (
    <DashboardContainer>
      <StyledNavbarDash />
      <StyledCustomers />
    </DashboardContainer>
  );
}