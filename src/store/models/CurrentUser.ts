import { Instance, types } from "mobx-state-tree";
import iRootStoreProvider from "../stores/iRootStoreProvider";
import { ICart } from "./Cart";
import { ICartItem } from "./CartItem";
import { IOrder } from "./Order";
import { IOrderItem } from "./OrderItem";

export interface ICurrentUser extends Instance<typeof CurrentUser> {

}

export const CurrentUser = iRootStoreProvider
    .props({
        id: types.identifierNumber,
        login: types.maybeNull(types.string),
        first_name: types.maybeNull(types.string),
        last_name: types.maybeNull(types.string),
        date_of_birth: types.maybeNull(types.string),
        phone: types.maybeNull(types.string),
        email: types.maybeNull(types.string)
    })
    .views(self => ({
        get cart(): ICart {
            return self.rootStore.cart as ICart;
        },
        
        get orders(): IOrder[] {
            return Array.from(self.rootStore.orderStore.data.values()).filter(order => order.user_id === self.id);
        },

        get cartItems(): ICartItem[] {
            return (self.rootStore.cart as any).items;
        }
    }))
.views(self => ({
    get orderItems(): IOrderItem[] {
        return self.orders.flatMap(order => order.items);
    }
}))