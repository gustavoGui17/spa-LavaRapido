import StyledNavbar from "../../componets/ComponetsHome/Navbar/StyledNavbar";
import StyledBanner from "../../componets/ComponetsHome/Navbar/StyledBanner";
import StyledPricing from "../../componets/ComponetsHome/Cards/StyledPricing";
import StyledMain from "../../componets/ComponetsHome/Main/StyledMain";
import StyledCarDetaling from "../../componets/ComponetsHome/Main/StyledCarDetaling";
import StyledGallery from "../../componets/ComponetsHome/Gallery/StyledGallery";
import StyledMaps from "../../componets/ComponetsHome/Maps/StyledMaps";

export default function Home(){
    return (
        <div>
            <StyledNavbar/>
            <StyledBanner/>
            <StyledPricing/>
            <StyledMain/>
            <StyledCarDetaling/>
            <StyledGallery/>
            <StyledMaps/>
        </div>
    )
}