import preloader from "../assets/vector/loader.svg";

export default function Preloader() {
    return <div className="preloader">
        <img
            src={preloader}
            alt="loading..."
        />
    </div>;
}