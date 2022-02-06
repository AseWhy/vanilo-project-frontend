import { toString } from "lodash";
import { flow, Instance, types } from "mobx-state-tree";
import { CloudFilterOperator } from "../../../api/CloudFilter";
import VaniloService from "../../../api/VaniloService";
import { ICurrentUser } from "../../models/CurrentUser";
import { IOrder, Order } from "../../models/Order";
import DefaultStore from "../DefaultStore";
import { IOrderItemStore } from "./OrderItemStore";

export interface IOrderStore extends Instance<typeof OrderStore> {

}

export const OrderStore = DefaultStore
    .named("OrderStore")
    .props({
        data: types.map(Order)
    })
    .views(self => ({
        getById(id: number): IOrder | undefined {
            return self.data.get(toString(id));
        }
    }))
    .actions(self => ({
        fetchRelations: flow(function* (content: any[]) {
            const collectionsStore = self.rootStore.orderItemsStore as IOrderItemStore;

            yield collectionsStore.fetchItemsByOrders(content.map(e => e.id));
        })
    }))
.actions(self => ({
    fetchOrdersByUser: flow(function *() {
        self.loading();
        
        const user = self.rootStore.user as ICurrentUser;
        const items = yield VaniloService.findOrders(self.byAttrFilter("userId", CloudFilterOperator.Equal, user?.id));
        const content = items.content;

        yield self.fetchRelations(content);

        for(const current of content) {
            self.data.put(current);
        }

        self.loaded();
    })
}))