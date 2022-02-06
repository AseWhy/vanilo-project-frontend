import { observer } from "mobx-react";
import { CloudServiceInstance } from "../../../../api/CloudService";
import { ICartItem } from "../../../../store/models/CartItem";

import "../../../../assets/cart_item.css";

export default observer(({ item }: { item: ICartItem }) => {
    return <div className="cart_item_container">
        <img
            src={CloudServiceInstance.storage(item?.collection?.poster ?? "")}
            alt="Cart item"
            className="cart_item_poster"
            width="200"
            height="200"
        />

        <table className="cart_item_info">
            <col width="30%"/>
            <col width="20%"/>
            <col width="25%"/>
            <col width="25%"/>

            <thead>
                <tr>
                    <th>
                        Vinyl record
                    </th>

                    <th>
                        PRICE
                    </th>

                    <th>
                        Quantity
                    </th>

                    <th>
                        Total
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td className="cart_item_metainfo">
                        { item?.collection?.author?.name } <br/>
                        { item?.collection?.name }
                    </td>

                    <td className="cart_item_collection_cost">
                        { item?.collection?.cost.toFixed(2) }$ <span>price for one</span>
                    </td>

                    <td className="cart_item_quantity">
                        <div className="cart_items_action_wrapper">
                            <div className="cart_items_common_wrapper">
                                <button onClick={() => item.addQuantity(-1)}> - </button>

                                { item?.quantity }

                                <button onClick={() => item.addQuantity(1)}> + </button>
                            </div>

                            <div className="cart_items_additional_wrapper">
                                <button onClick={() => item.delete()}>
                                    ✖ delete
                                </button>
                            </div>
                        </div>
                    </td>

                    <td className="cart_final_cost">
                        { item.cost.toFixed(2) }$
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
})