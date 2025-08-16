import StyledNavbar from "../../componets/Navbar/StyledNavbar";
import StyledBanner from "../../componets/Navbar/StyledBanner";
import StyledPricing from "../../componets/Cards/StyledPricing";
import StyledMain from "../../componets/Main/StyledMain";

export default function Home(){
    return (
        <div>
            <StyledNavbar/>
            <StyledBanner/>
            <StyledPricing/>
            <StyledMain/>
        </div>
    )
}