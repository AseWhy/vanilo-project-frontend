import { Redirect, Route, Switch } from "react-router-dom";
import { useRoot } from "../../config/hooks";
import ServiceRouter from "../../router/ServiceRoute";
import NotFoundPage from "../NotFoundPage";
import AboutPage from "./pages/about/AboutPage";
import CartPage from "./pages/cart/CartPage";
import CollectionPage from "./pages/collection/CollectionPage";
import DetailsPage from "./pages/details/DetailsPage";
import MainPage from "./pages/main/MainPage";
import ProfilePage from "./pages/profile/ProfilePage";

export default function SafeLogin({ children }: any) {
    const root = useRoot();

    if(root.requireGoToLogin()) {
        return <Redirect from="*" to={ServiceRouter.loginPage.routeWithoutParams} exact/>;
    }

    return <Switch>
        <Route exact path={ServiceRouter.profilePage.routeWithoutParams} component={ProfilePage}/>
        <Route exact path={ServiceRouter.collectionPage.routeWithoutParams} component={CollectionPage}/>
        <Route exact path={ServiceRouter.detailsPage.routeWithoutParams} component={DetailsPage}/>
        <Route exact path={ServiceRouter.cartPage.routeWithoutParams} component={CartPage}/>
        <Route exact path={ServiceRouter.aboutPage.routeWithoutParams} component={AboutPage}/>
        <Route exact path={ServiceRouter.mainPage.routeWithoutParams} component={MainPage}/>

        <Route exact component={NotFoundPage}/>
    </Switch>;
}