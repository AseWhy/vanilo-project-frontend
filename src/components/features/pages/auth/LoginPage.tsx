import { Field, Form, Formik } from "formik"
import { Link, useHistory } from "react-router-dom"
import Splitterator from "../../../common/Splitterator"

import AuthOptionsButton from "./includes/AuthOptionsButton"
import WrapInputVariations from "./includes/WrapInputVariations";

import "../../../../assets/auth.css";
import "../../../../assets/login.css";

import { useRoot } from "../../../../config/hooks";
import ServiceRouter from "../../../../router/ServiceRoute";

export default function LoginPage() {
    const root = useRoot();
    const hitory = useHistory();

    async function submit(values: any) {
        await root.loginUser(values);

        if(root.user != null) {
            hitory.push(ServiceRouter.mainPage.routeWithoutParams);
        }
    }

    return <Formik
        initialValues={{}}
        onSubmit={submit}
    >
        <Form>
            <div className="wrap-system-center">
                <AuthOptionsButton/>

                <div className="wrap-inputs">
                    <Field type="text" name="login" placeholder="login"/>
                    <Field type="password" name="password" placeholder="password"/>
                </div>

                <div className="login-wrap-underlinks">
                    <Link to="/#"> forgot password? </Link>

                    <button
                        type="submit"
                    >
                        Log in
                    </button>
                </div>

                <Splitterator/>

                <WrapInputVariations/>
            </div>
        </Form>
    </Formik>
}