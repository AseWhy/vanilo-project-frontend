import { NavLink } from "react-router-dom";
import logo from "../../../../../assets/vector/logo.svg"
import ServiceRouter from "../../../../../router/ServiceRoute";

export default function AuthOptionsButton() {
    return <>
        <img
            src={logo}
            alt="logo"
        />

        <div className="auth-options-button">
            <NavLink to={ServiceRouter.loginPage.routeWithoutParams} activeClassName="active">
                Log in
            </NavLink>

            <NavLink to={ServiceRouter.registrationPage.routeWithoutParams} activeClassName="active">
                Sign up
            </NavLink>
        </div>
    </>;
}