import StyledNavbar from "../../components/Home/Navbar/StyledNavbar";
import StyledBanner from "../../components/Home/Navbar/StyledBanner";
import StyledPricing from "../../components/Home/Cards/StyledPricing";
import StyledMain from "../../components/Home/Main/StyledMain";
import StyledCarDetaling from "../../components/Home/Main/StyledCarDetaling";
import StyledGallery from "../../components/Home/Gallery/StyledGallery";
import StyledMaps from "../../components/Home/Maps/StyledMaps";

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