import { Instance, types } from "mobx-state-tree";
import iRootStoreProvider from "../stores/iRootStoreProvider";
import { IOrderItem } from "./OrderItem";

export interface IOrder extends Instance<typeof Order> {

}

export const Order = iRootStoreProvider
    .props({
        id: types.identifierNumber,
        user_id: types.integer
    })
    .views(self => ({
        get items(): IOrderItem[] {
            return Array.from(self.rootStore.orderItemsStore.data.values()).filter(item => item.order_id === self.id)
        }
    }))
.views(self => ({

}));