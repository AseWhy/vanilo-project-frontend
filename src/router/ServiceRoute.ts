import Route from "./Router";

export default class ServiceRouter extends Route {
    public static readonly mainPage = new ServiceRouter("/");
    public static readonly loginPage = new ServiceRouter("login", ServiceRouter.mainPage);
    public static readonly registrationPage = new ServiceRouter("registration", ServiceRouter.mainPage);
    public static readonly collectionPage = new ServiceRouter("collection", ServiceRouter.mainPage);
    public static readonly detailsPage = new ServiceRouter("details/:id", ServiceRouter.mainPage);
    public static readonly aboutPage = new ServiceRouter("about", ServiceRouter.mainPage);
    public static readonly cartPage = new ServiceRouter("cart", ServiceRouter.mainPage);
    public static readonly profilePage = new ServiceRouter("profile", ServiceRouter.mainPage);
}