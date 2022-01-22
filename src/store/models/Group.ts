import { cloneDeep, toString } from "lodash";
import { types, flow, Instance } from "mobx-state-tree";
import EducService from "../../api/EducService";
import iRootStoreProvider from "../stores/iRootStoreProvider";
import DefaultStore from "../stores/iStoreMember";

export const Group = iRootStoreProvider.props({
    id: types.identifierNumber,
    speciality_id: types.number,
    name: types.string,
}).views(self => ({
    get display() {
        return self.name;
    },

    get speciality() {
        return self.specialityStore.getById(self.speciality_id);
    },

    get specialityName() {
        return self.specialityStore.getById(self.speciality_id)?.display;
    }
}));

export interface IGroupStore extends Instance<typeof GroupStore> {}

export const GroupStore = DefaultStore
    .named("GroupStore")
    .props({
        data: types.map(Group),
        received: types.array(Group)
    })
    .views(self => ({
        get pure(): any {
            return self.received;
        },

        get raw(): any {
            return self.received.slice();
        }
    }))
    .actions(self => ({
        extractIds(input: any[]): number[] {
            return input.map(e => e.group_id);
        },

        containsAllIds(input: number[]): boolean {
            return input.every(e => self.data.has(toString(e)));
        },

        fetchRelations: flow(function* (input: any[]) {
            const specialityStore = self.specialityStore;
            const specialityIds = specialityStore.extractIds(input);

            if(!specialityStore.containsAllIds(specialityIds)) {
                yield specialityStore.fetchByIds(specialityIds);
            }
        }),

        dropData() {
            self.received.splice(0, self.received.length, ...cloneDeep(Array.from(self.data.values())));
        }
    }))
.actions(self => ({
    fetchByIds: flow(function* (ids: number[]) {
        if(self.containsAllIds(ids)) {
            return;
        }

        self.setLoading();
        
        const response = yield EducService.findGroups(self.byIdFilter(ids));

        yield self.fetchRelations(response.content);

        for(const current of response.content) {
            self.data.put(current);
        }

        self.setLoaded();
    }),

    fetch: flow(function* () {
        const response = yield EducService.findGroups(self.pageFilter());

        yield self.fetchRelations(response.content);

        for(const current of response.content) {
            self.data.put(current);
        }

        self.dropData();

        self.pageProcess(response);
    }),

    add: flow(function* (payload: any) {
        self.setLoading();
        
        const received = yield EducService.addGroup(payload);

        self.data.put(received);

        self.dropData();
        self.setLoaded();
    }),

    delete: flow(function* (id: any) {
        self.setLoading();
        
        yield EducService.deleteGroup(id);

        self.data.delete(id);

        self.dropData();
        self.setLoaded();
    }),

    edit: flow(function* (id: any, payload: any) {
        self.setLoading();
        
        const received = yield EducService.editGroup(id, payload);

        self.data.delete(id);
        self.data.put(received);

        self.dropData();
        self.setLoaded();
    }),

    getById(id: any) {
        return self.data.get(toString(id));
    }
}));