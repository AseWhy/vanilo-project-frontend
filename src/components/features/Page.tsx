import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useRoot } from "../../config/hooks";
import ServiceRouter from "../../router/ServiceRoute";
import ErrorBoundary from "../ErrorBoundary";
import Preloader from "../Preloader";
import Router from "./Router";

export default observer(() => {
    const root = useRoot();

    useEffect(() => {
        if(ServiceRouter.loginPage.isCurrent) {
            return;
        }

        root.fetchCurrentUser(false);
    }, [ root ]);


    if(root.isLoading) {
        return <Preloader/>
    }

    return <ErrorBoundary>
        <Router/>
    </ErrorBoundary>;
})