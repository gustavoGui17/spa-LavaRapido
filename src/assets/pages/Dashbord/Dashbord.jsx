import StyledNavbarDash from "../../componets/ComponetsDashbord/StyledNavbarDash";
import StyledMainDash from "../../componets/ComponetsDashbord/StyledMainDash";
import StyledHistory from "../../componets/ComponetsDashbord/StyledHistory";
import { DashboardContainer } from "../../componets/ComponetsDashbord/DashboardContainer";

export default function Dashbord(){
    return(
        <DashboardContainer>
            <StyledNavbarDash/>
            <div>
                <StyledMainDash/>
                <StyledHistory/>
            </div>
        </DashboardContainer>
    )
}