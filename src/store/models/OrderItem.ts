import { Instance, types } from "mobx-state-tree";
import iRootStoreProvider from "../stores/iRootStoreProvider";
import { ICollection } from "./Collection";

export interface IOrderItem extends Instance<typeof OrderItem> {

}

export const OrderItem = iRootStoreProvider
    .props({
        id: types.identifierNumber,
        user_id: types.integer,
        order_id: types.integer,
        collection_id: types.integer,
        quantity: types.integer,
        cost: types.number
    })
.views(self => ({
    get collection(): ICollection | undefined {
        return self.rootStore.collectionStore.getById(self.collection_id);
    },

    get computedCost() {
        return (self?.quantity * (this?.collection?.cost ?? 0));
    }
}));