import StyledNavbarDash from "../../components/Dashbord/StyledNavbarDash";
import StyledMainCustomers from "../../components/Customers/StyledMainCustomers";
import { DashboardContainer } from "../../components/Dashbord/DashboardContainer";

export default function Customers() {
  return (
    <DashboardContainer>
      <StyledNavbarDash />
      <div>
        <StyledMainCustomers />
      </div>
    </DashboardContainer>
  );
}