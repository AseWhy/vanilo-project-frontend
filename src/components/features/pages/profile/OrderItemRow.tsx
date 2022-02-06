import { observer } from "mobx-react";
import { CloudServiceInstance } from "../../../../api/CloudService";
import { IOrderItem } from "../../../../store/models/OrderItem";

import "../../../../assets/order_item.css";

export default observer(({ item }: { item: IOrderItem }) => {
    return <div className="cart_item_container">
        <img
            src={CloudServiceInstance.storage(item?.collection?.poster ?? "")}
            alt="Order item"
            className="order_item_poster"
            width="200"
            height="200"
        />

        <table className="order_item_info">
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
                    <td className="order_item_metainfo">
                        { item?.collection?.author?.name } <br/>
                        { item?.collection?.name }
                    </td>

                    <td className="order_item_collection_cost">
                        { item?.cost.toFixed(2) }$ <span>price for one</span>
                    </td>

                    <td className="order_item_quantity">
                        { item?.quantity }
                    </td>

                    <td className="order_final_cost">
                        { item.computedCost.toFixed(2) }$
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
})