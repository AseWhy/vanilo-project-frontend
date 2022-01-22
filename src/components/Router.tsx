import { Suspense } from "react";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { browserHistory } from "../config";
import ServiceRouter from "../router/ServiceRoute";
import GroupsListPage from "./features/groups/GroupsListPage";
import PeoplesListPage from "./features/peoples/PeoplesListPage";
import SemestersListPage from "./features/semesters/SemestersListPage";
import SpecialityListPage from "./features/speciality/SpecialityListPage";
import StatementsListPage from "./features/statements/StatementsListPage";
import StudentListPage from "./features/students/StudentListPage";
import TeacherListPage from "./features/teachers/TeacherListPage";
import ThingsListPage from "./features/things/ThingsListPage";
import NotFoundPage from "./NotFoundPage";
import Preloader from "./Preloader";

export default function ServiceRoutes() {
    return <Suspense fallback={<Preloader/>}>
        <Router history={browserHistory}>
            <Switch>
                <Redirect from={ServiceRouter.base.routeWithoutParams} to={ServiceRouter.studentsPage.routeWithoutParams} exact/>

                <Route path={ServiceRouter.peoplesPage.routeWithoutParams} component={PeoplesListPage} exact/>
                <Route path={ServiceRouter.studentsPage.routeWithoutParams} component={StudentListPage} exact/>
                <Route path={ServiceRouter.specialityPage.routeWithoutParams} component={SpecialityListPage} exact/>
                <Route path={ServiceRouter.groupsPage.routeWithoutParams} component={GroupsListPage} exact/>
                <Route path={ServiceRouter.semestersPage.routeWithoutParams} component={SemestersListPage} exact/>
                <Route path={ServiceRouter.teachersPage.routeWithoutParams} component={TeacherListPage} exact/>
                <Route path={ServiceRouter.thingsPage.routeWithoutParams} component={ThingsListPage} exact/>
                <Route path={ServiceRouter.statementsPage.routeWithoutParams} component={StatementsListPage} exact/>

                <NotFoundPage/>
            </Switch>
        </Router>
    </Suspense>
}