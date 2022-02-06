import { Field, Form, Formik } from "formik"
import Splitterator from "../../../common/Splitterator"

import WrapInputVariations from "./includes/WrapInputVariations";

import "../../../../assets/auth.css";
import "../../../../assets/registration.css";
import AuthOptionsButton from "./includes/AuthOptionsButton"
import { toast } from 'react-toastify';
import { useState } from "react";
import { useRoot } from "../../../../config/hooks";
import { useHistory } from "react-router";
import ServiceRouter from "../../../../router/ServiceRoute";

export default function RegistrationPage() {
    const root = useRoot();
    const hitory = useHistory();
    const [ stage, setStage ] = useState(1);

    async function submit(values: any) {
        if(values['password'] !== values['password_confirm']) {
            toast("Password mismatch!", { type: "error" });

            setStage(1);

            return;
        }

        delete values['password_confirm'];

        await root.registerUser(values);

        hitory.push(ServiceRouter.mainPage.routeWithoutParams);
    }

    return <Formik
        initialValues={{}}
        onSubmit={submit}
    >
        <Form>
            <div className="wrap-system-center">
                <AuthOptionsButton/>

                <div className={"input-wrapper-container stage-" + stage}>
                    <div className="wrap-inputs">
                        <Field type="text" name="login" placeholder="Number phone or e-mail adress...."/>
                        <Field type="password" name="password" placeholder="Password..."/>
                        <Field type="password" name="password_confirm" placeholder="Confirm password..."/>
                    </div>

                    <div className="wrap-inputs">
                        <Field type="text" name="last_name" placeholder="Last name"/>
                        <Field type="text" name="first_name" placeholder="First name"/>
                        <Field type="text" name="date_of_birth" placeholder="Date of Birth"/>
                    </div>
                </div>

                <div className="registration-wrap-underlinks">
                    <button
                        type={stage === 3 ? "submit" : "button"}
                        onMouseUp={() => setStage(Math.min(stage + 1, 3))}
                    >
                        { stage === 2 ? "Sign Up" : "Continue" }
                    </button>
                </div>

                <Splitterator/>

                <WrapInputVariations/>
            </div>
        </Form>
    </Formik>
}