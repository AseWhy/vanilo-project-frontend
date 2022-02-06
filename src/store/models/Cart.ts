import { flow, Instance, types } from "mobx-state-tree";
import VaniloService from "../../api/VaniloService";
import { IOrderStore } from "../stores/impl/OrderStore";
import iRootStoreProvider from "../stores/iRootStoreProvider";
import { ICartItem } from "./CartItem";
import { ICollection } from "./Collection";

export interface ICart extends Instance<typeof Cart> {

}

export const Cart = iRootStoreProvider
    .props({
        id: types.identifierNumber,
        user_id: types.integer
    })
    .views(self => ({
        get items(): ICartItem[] {
            return Array.from(self.rootStore.cartItemStore.data.values())
        }
    }))
    .views(self => ({
        containsItem(collection: ICollection) {
            return self.items.some(e => e.collection_id === collection.id);
        },

        get costOfGoods() {
            return self.items.reduce((a, b) => a + b.cost, 0);
        }
    }))
.actions(self => ({
    addItem: flow(function* (collection: ICollection) {
        yield VaniloService.addItemToCart(self.id, { collection_id: collection.id, quantity: 1 });

        self.rootStore.cartItemStore.fetchItemsByCart();
    }),

    commit: flow(function* () {
        const ordersStore = self.rootStore.orderStore as IOrderStore;

        yield VaniloService.addOrder();
        yield ordersStore.fetchOrdersByUser();

        self.rootStore.cartItemStore.clear();
    })
}));