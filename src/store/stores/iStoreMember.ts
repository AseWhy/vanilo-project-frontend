import { types } from "mobx-state-tree";
import CloudFilter, { CloudFilterOperator, CloudFilterOrder } from "../../api/CloudFilter";
import iRootStoreProvider from "./iRootStoreProvider";

export default iRootStoreProvider
    .props({
        page: types.optional(types.number, 0),
        elementsPerPage: types.optional(types.number, 500),
        totalElements: types.optional(types.number, 0),
        totalPages: types.optional(types.number, 0),
        requested: types.array(types.number)
    })
    .views(self => ({

    }))
.actions(self => ({
    pageProcess(response: any,) {
        self.totalElements = response.totalElements;
        self.totalPages = response.totalElements / self.elementsPerPage;
    },
    
    getUnreqestedData(entities: any[]): any[] {
        const unrequested = entities.filter((entiy: any) => !self.requested.includes(entiy.id));
        self.requested.push(...unrequested.map((e: any) => e.id));
        return unrequested;
    },

    nextPage() {
        self.page += 1;
    },

    prevPage() {
        self.page -= 1;
    },

    setPage(page: number) {
        self.page = page;
    },

    pageFilter() {
        return CloudFilter.init()
            .setPage(self.page)
            .setCountPerPage(self.elementsPerPage)
        .setOrder(CloudFilterOrder.DESC, [ "id" ]);
    },

    byIdFilter(ids: any[]) {
        return CloudFilter.init()
            .setOrder(CloudFilterOrder.DESC, [ "id" ])
        .exec(builder => builder.in("id", ids));
    },

    byAttrFilter(attrname: string, operator: CloudFilterOperator, value: any) {
        return CloudFilter.init()
            .setOrder(CloudFilterOrder.DESC, [ "id" ])
        .exec(builder => builder.where(attrname, operator, value));
    }
}))