import { Link, useHistory } from "react-router-dom";
import { useRoot } from "../../../../config/hooks";
import ServiceRouter from "../../../../router/ServiceRoute";
import CartItemRow from "./CartItemRow";
import { observer } from "mobx-react";
import Preloader from "../../../Preloader";

import "../../../../assets/cart.css";

export default observer(() => {
    const history = useHistory();
    const rootStore = useRoot();
    const cart = rootStore.cart;

    if(rootStore.isLoading) {
        return <Preloader/>
    }

    return <div className="cart_root">
        <h1>
            Cart
        </h1>

        <hr/>

        {
            (cart?.items.length ?? 0) > 0 ?
                cart?.items.map((item, i) => 
                    <CartItemRow item={item} key={i}/>    
                ) :
                <p className="no_items_label">
                    No items yet...
                </p>
        }

        <hr/>

        <div className="cart_bottom_info">
            <Link
                to={ServiceRouter.collectionPage.routeWithoutParams}
                className="cart_bottom_continue"
            >
                🠔 <span>Continue Shopping</span>
            </Link>

            <button
                className="cart_bottom_do"
                onClick={async () => {
                    await cart?.commit();

                    history.push(ServiceRouter.profilePage.routeWithoutParams);
                }}
            >
                Choose a shipping method
            </button>

            <span className="cart_bottom_total_cost">
                Cost of goods: <span>{ cart?.costOfGoods.toFixed(2) }$</span>
            </span>
        </div>
    </div>
});