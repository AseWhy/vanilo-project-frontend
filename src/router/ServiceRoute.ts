import Route from "./Router";

export default class ServiceRouter extends Route {
    public static readonly base = new ServiceRouter("/");
    public static readonly studentsPage = new ServiceRouter("students", ServiceRouter.base);
    public static readonly peoplesPage = new ServiceRouter("peoples", ServiceRouter.base);
    public static readonly groupsPage = new ServiceRouter("groups", ServiceRouter.base);
    public static readonly thingsPage = new ServiceRouter("things", ServiceRouter.base);
    public static readonly semestersPage = new ServiceRouter("semesters", ServiceRouter.base);
    public static readonly statementsPage = new ServiceRouter("statements", ServiceRouter.base);
    public static readonly teachersPage = new ServiceRouter("teachers", ServiceRouter.base);
    public static readonly specialityPage = new ServiceRouter("speciality", ServiceRouter.base);
}