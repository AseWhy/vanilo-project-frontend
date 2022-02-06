import google from "../../../../../assets/vector/google.svg"
import facebook from "../../../../../assets/vector/facebook.svg"
import instagramm from "../../../../../assets/vector/instagram.svg"

export default function WrapInputVariations() {
    return <div
        className="wrap-input-variations"
    >
        <button>
            <img
                src={facebook}
                alt="facebook"
                width="32"
                height="32"
            />
        </button>

        <button>
            <img
                src={instagramm}
                alt="instagramm"
                width="32"
                height="32"
            />
        </button>

        <button>
            <img
                src={google}
                alt="google"
                width="32"
                height="32"
            />
        </button>
    </div>;
}