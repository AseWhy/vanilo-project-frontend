import { Switch, Route } from "react-router-dom";
import ServiceRouter from "../../router/ServiceRoute";
import SafeLogin from "./SafeLogin";
import NotFoundPage from "../NotFoundPage";
import LoginPage from "./pages/auth/LoginPage";
import RegistrationPage from "./pages/auth/RegistrationPage";
import CollectionPage from "./pages/collection/CollectionPage";
import AboutPage from "./pages/about/AboutPage";
import MainPage from "./pages/main/MainPage";

export default function Router() {
    return <Switch>
        <Route exact path={ServiceRouter.loginPage.routeWithoutParams} component={LoginPage}/>
        <Route exact path={ServiceRouter.registrationPage.routeWithoutParams} component={RegistrationPage}/>
        
        <Route exact path={ServiceRouter.collectionPage.routeWithoutParams} component={CollectionPage}/>
        <Route exact path={ServiceRouter.aboutPage.routeWithoutParams} component={AboutPage}/>
        <Route exact path={ServiceRouter.mainPage.routeWithoutParams} component={MainPage}/>

        <SafeLogin/>

        <Route component={NotFoundPage}/>
    </Switch>
}