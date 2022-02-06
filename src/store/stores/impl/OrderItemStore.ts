import { toString } from "lodash";
import { flow, Instance, types } from "mobx-state-tree";
import { CloudFilterOperator } from "../../../api/CloudFilter";
import VaniloService from "../../../api/VaniloService";
import { IOrderItem, OrderItem } from "../../models/OrderItem";
import DefaultStore from "../DefaultStore";
import { ICollectionStore } from "./CollectionStore";

export interface IOrderItemStore extends Instance<typeof OrderItemStore> {

}

export const OrderItemStore = DefaultStore
    .named("OrderItemStore")
    .props({
        data: types.map(OrderItem)
    })
    .views(self => ({
        getById(id: number): IOrderItem | undefined {
            return self.data.get(toString(id));
        },

        get iterable() {
            return Array.from(self.data.values());
        }
    }))
    .actions(self => ({
        fetchRelations: flow(function* (content: any[]) {
            const collectionsStore = self.rootStore.collectionStore as ICollectionStore;

            yield collectionsStore.fetchByIds(content.map(e => e.collection_id));
        })
    }))
.actions(self => ({
    fetchItemsByOrder: flow(function *(orderId: number) {
        const items = yield VaniloService.getOrderItems(orderId);
        const content = items.content;

        yield self.fetchRelations(content);

        for(const current of content) {
            self.data.put(current);
        }
    }),

    fetchItemsByOrders: flow(function *(orderIds: number[]) {
        self.loading();

        const items = yield VaniloService.findOrderItems(self.byAttrFilter("orderId", CloudFilterOperator.In, orderIds));
        const content = items.content;

        yield self.fetchRelations(content);
        
        for(const current of content) {
            self.data.put(current);
        }

        self.loaded();
    })
}))