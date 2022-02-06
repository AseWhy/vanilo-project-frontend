import { flow, Instance, types } from "mobx-state-tree";
import VaniloService from "../../api/VaniloService";
import { ICartItemStore } from "../stores/impl/CartItemStore";
import iRootStoreProvider from "../stores/iRootStoreProvider";
import { ICollection } from "./Collection";

export interface ICartItem extends Instance<typeof CartItem> {

}

export const CartItem = iRootStoreProvider
    .props({
        id: types.identifierNumber,
        user_id: types.integer,
        cart_id: types.integer,
        collection_id: types.integer,
        quantity: types.integer
    })
    .actions(self => ({
        addQuantity: flow(function* (difference: number) {
            if(self.quantity + difference <= 0) {
                return;
            }

            const cartItemStore = self.rootStore.cartItemStore as ICartItemStore;
            const item = yield VaniloService.editCartItem(self.id, { quantity: self.quantity + difference });

            cartItemStore.replace(item);
        }),

        delete: flow(function* () {
            const cartItemStore = self.rootStore.cartItemStore as ICartItemStore;

            yield VaniloService.deleteCartItem(self.id);

            cartItemStore.delete(self.id);
        })
    }))
.views(self => ({
    get cost() {
        return (self?.quantity * (this?.collection?.cost ?? 0));
    },

    get collection(): ICollection | undefined {
        return self.rootStore.collectionStore.getById(self.collection_id);
    }
}));