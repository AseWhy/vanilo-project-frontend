import { Suspense } from "react";
import { Router } from "react-router-dom";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import Page from "./components/features/Page";
import Preloader from "./components/Preloader";
import { commonHistory } from "./config";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Container() {
    return <Suspense fallback={<Preloader/>}>
        <ToastContainer/>
        
        <Router history={commonHistory}>
            <Header/>
            
            <div className="main-container">
                <Page/>
            </div>

            <Footer/>
        </Router>
    </Suspense>
}