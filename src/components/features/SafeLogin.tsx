import { observer } from "mobx-react";
import { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useRoot } from "../../config/hooks";
import ServiceRouter from "../../router/ServiceRoute";
import NotFoundPage from "../NotFoundPage";
import Preloader from "../Preloader";
import CartPage from "./pages/cart/CartPage";
import DetailsPage from "./pages/details/DetailsPage";
import ProfilePage from "./pages/profile/ProfilePage";

export default observer(() => {
    const root = useRoot();

    useEffect(() => {
        root.fetchCurrentUser(false);
    }, [ root ]);

    if(root.isLoading) {
        return <Preloader/>
    }

    if(root.requireGoToLogin()) {
        return <Redirect from="*" to={ServiceRouter.loginPage.routeWithoutParams} exact/>;
    }

    return <Switch>
        <Route exact path={ServiceRouter.profilePage.routeWithoutParams} component={ProfilePage}/>
        <Route exact path={ServiceRouter.detailsPage.routeWithoutParams} component={DetailsPage}/>
        <Route exact path={ServiceRouter.cartPage.routeWithoutParams} component={CartPage}/>

        <Route exact component={NotFoundPage}/>
    </Switch>;
})