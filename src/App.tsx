import ErrorBoundary from "./components/ErrorBoundary";
import Router from "./components/Router";

import "./assets/common.css";

export default function App() {
    return <ErrorBoundary>
        <Router/>
    </ErrorBoundary>;
}