import { toString } from "lodash";
import { flow, Instance, types } from "mobx-state-tree";
import VaniloService from "../../../api/VaniloService";
import { ICart } from "../../models/Cart";
import { CartItem, ICartItem } from "../../models/CartItem";
import DefaultStore from "../DefaultStore";
import { ICollectionStore } from "./CollectionStore";

export interface ICartItemStore extends Instance<typeof CartItemStore> {

}

export const CartItemStore = DefaultStore
    .named("CartItemStore")
    .props({
        data: types.map(CartItem)
    })
    .views(self => ({
        getById(id: number): ICartItem | undefined {
            return self.data.get(toString(id));
        }
    }))
    .actions(self => ({
        delete(id: number) {
            self.data.delete(toString(id));
        },

        replace(item: any) {
            self.data.put(item);
        },

        clear() {
            self.data.clear();
        },

        fetchRelations: flow(function* (content: any[]) {
            const collectionsStore = self.rootStore.collectionStore as ICollectionStore;

            yield collectionsStore.fetchByIds(content.map(e => e.collection_id));
        })
    }))
.actions(self => ({
    fetchItemsByCart: flow(function *() {
        self.loading();

        const cart = self.rootStore.cart as ICart;
        const items = yield VaniloService.getCartItems(cart.id);
        const content = items.content;

        self.data.clear();

        for(const current of content) {
            self.data.put(current);
        }

        yield self.fetchRelations(content);

        self.loaded();
    })
}))