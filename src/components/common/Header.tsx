import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/vector/logo.svg"
import search from "../../assets/vector/search.svg"
import ServiceRouter from "../../router/ServiceRoute";

import "../../assets/header.css";
import UserIcon from "../icons/UserIcon";
import CartIcon from "../icons/CartIcon";

export default function Header() {
    const { pathname } = useLocation();

    return <div className="header-container">
        <img
            src={logo}
            alt="logo"
        />

        <div className="header-button-container">
            <NavLink exact activeClassName="active" to={ServiceRouter.mainPage.routeWithoutParams}> Main </NavLink>

            <NavLink
                exact
                activeClassName="active"
                to={ServiceRouter.collectionPage.routeWithoutParams}
                isActive={
                    () => [
                        ServiceRouter.collectionPage.isCurrent,
                        ServiceRouter.detailsPage.isCurrent
                    ].includes(true)
                }
            >
                Collection
            </NavLink>

            <NavLink exact activeClassName="active" to={ServiceRouter.aboutPage.routeWithoutParams}> Contacts </NavLink>
        </div>

        <div className="search">
            <input
                type="text"
                className="search-field"
                placeholder="Search"
            />

            <img
                src={search}
                alt="search"
                height="14"
                className="search-icon"
            />
        </div>

        <NavLink
            to={ServiceRouter.profilePage.routeWithoutParams}
            activeClassName="active"
            exact
            isActive={
                () => [
                    ServiceRouter.profilePage.isCurrent,
                    ServiceRouter.loginPage.isCurrent,
                    ServiceRouter.registrationPage.isCurrent
                ].includes(true)
            }
        >
            <div className="user-icon hright-icon">
                <UserIcon/>
            </div>
        </NavLink>

        <NavLink
            to={ServiceRouter.cartPage.routeWithoutParams}
            activeClassName="active"
        >
            <div className="cart-icon hright-icon">
                <CartIcon/>
            </div>
        </NavLink>
    </div>
}