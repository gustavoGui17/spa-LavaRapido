import StyledNavbarDash from "../../componets/ComponetsDashbord/StyledNavbarDash";
import StyledMainDash from "../../componets/ComponetsDashbord/StyledMainDash";
import { DashboardContainer } from "../../componets/ComponetsDashbord/DashboardContainer";

export default function Dashbord(){
    return(
        <DashboardContainer>
            <StyledNavbarDash/>
            <StyledMainDash/>
        </DashboardContainer>
    )
}