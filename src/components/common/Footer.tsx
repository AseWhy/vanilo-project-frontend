import { Link } from "react-router-dom";
import logo from "../../assets/vector/logo.svg"
import ServiceRouter from "../../router/ServiceRoute";

import "../../assets/footer.css";

export default function Footer() {
    return <div className="footer-container">
        <div className="footer-left-side">
            <img
                src={logo}
                alt="logo"
            />

            <p>Everything that has been done on this site. Not College-trained. This is my experience. My labors and sufferings, blood and sweat.</p>
            <p>2019-2021 DESIGN STUDIO “AV PROD.”</p>
        </div>

        <div className="footer-button-container">
            <Link to={ServiceRouter.mainPage.routeWithoutParams}> Main </Link>
            <Link to={ServiceRouter.collectionPage.routeWithoutParams}> Collection </Link>
            <Link to={ServiceRouter.aboutPage.routeWithoutParams}> Contacts </Link>
        </div>
    </div>
}