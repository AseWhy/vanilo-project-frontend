import { Switch, Route } from "react-router-dom";
import ServiceRouter from "../../router/ServiceRoute";
import SafeLogin from "./SafeLogin";
import NotFoundPage from "../NotFoundPage";
import LoginPage from "./pages/auth/LoginPage";
import RegistrationPage from "./pages/auth/RegistrationPage";

export default function Router() {
    return <Switch>
        <Route exact path={ServiceRouter.loginPage.routeWithoutParams} component={LoginPage}/>
        <Route exact path={ServiceRouter.registrationPage.routeWithoutParams} component={RegistrationPage}/>
        
        <SafeLogin/>

        <Route component={NotFoundPage}/>
    </Switch>
}