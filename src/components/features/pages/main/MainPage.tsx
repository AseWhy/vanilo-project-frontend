import { Link } from "react-router-dom"
import "../../../../assets/main.css"
import ServiceRouter from "../../../../router/ServiceRoute"

export default function MainPage() {
    return <>
        <div className="main-block">
            <div className="main-block-wrapper">
                <div className="main-block-header">
                    VANILO
                </div>

                <div className="main-block-sub-header">
                    vinyl record store
                </div>

                <Link to={ServiceRouter.collectionPage.routeWithoutParams} className="main-block-collection-link">
                    Our collection
                </Link>
            </div>
        </div>

        <div className="foot-block">
            <div className="foot-sides">
                <div className="foot-left-side">
                    <p> About Us </p>

                    <p>
                        VANILO vinyl record store. We have been working since 2020.
                        It would seem that not long ago, but we have something to brag about,
                        we have in our assortment most of the popular records. On the site you
                        cannot buy a disc, but just look at our assortment, the purchase is made
                        directly in our store at Revolutionary 64.
                    </p>
                
                    <p> waiting for you! </p>
                </div>

                <div className="foot-right-side">
                    <div className="grid-teim-1">

                    </div>
                    <div className="grid-teim-2">

                    </div>
                    <div className="grid-teim-3">

                    </div>
                </div>
            </div>
        </div>
    </>
}