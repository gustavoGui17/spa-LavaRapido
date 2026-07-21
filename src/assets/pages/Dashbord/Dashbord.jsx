import StyledNavbarDash from "../../components/Dashbord/StyledNavbarDash";
import StyledMainDash from "../../components/Dashbord/StyledMainDash";
import { DashboardContainer } from "../../components/Dashbord/DashboardContainer";

export default function Dashbord(){
    return(
        <DashboardContainer>
            <StyledNavbarDash/>
            <div>
                <StyledMainDash/>
            </div>
        </DashboardContainer>
    )
}