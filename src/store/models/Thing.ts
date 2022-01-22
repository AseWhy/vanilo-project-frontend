import { toString, cloneDeep } from "lodash";
import { types, flow, Instance } from "mobx-state-tree";
import EducService from "../../api/EducService";
import iRootStoreProvider from "../stores/iRootStoreProvider";
import DefaultStore from "../stores/iStoreMember";

export const Thing = iRootStoreProvider.props({
    id: types.identifierNumber,
    name: types.string,
    teacher_id: types.number
}).views(self => ({
    get teacher() {
        return self.teacherStore.getById(self.teacher_id);
    }
})).views(self => ({
    get teacherFullname() {
        return self.teacher?.fullname;
    },

    get display() {
        return self.name;
    }
}))

export interface IThingStore extends Instance<typeof ThingStore> {}

export const ThingStore = DefaultStore
    .named("ThingStore")
    .props({
        data: types.map(Thing),
        received: types.array(Thing)
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
            return input.map(e => e.thing_id);
        },

        containsAllIds(input: number[]): boolean {
            return input.every(e => self.data.has(toString(e)));
        },

        fetchRelations: flow(function* (input: any[]) {
            const recieved = self.getUnreqestedData(input);
            const teacherStore = self.teacherStore;

            if(recieved.length > 0) {
                const teacherIds = teacherStore.extractIds(recieved);

                if(!teacherStore.containsAllIds(teacherIds)) {
                    yield teacherStore.fetchByIds(teacherIds);
                }
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
        
        const response = yield EducService.findThings(self.byIdFilter(ids));

        yield self.fetchRelations(response.content);

        for(const current of response.content) {
            self.data.put(current);
        }

        self.dropData();
        self.setLoaded();
    }),

    fetch: flow(function* () {
        const response = yield EducService.findThings(self.pageFilter());

        yield self.fetchRelations(response.content);

        for(const current of response.content) {
            self.data.put(current);
        }

        self.dropData();
        self.pageProcess(response);
    }),

    add: flow(function* (payload: any) {
        self.setLoading();
        
        const received = yield EducService.addThing(payload);

        self.data.put(received);

        self.dropData();
        self.setLoaded();
    }),

    delete: flow(function* (id: any) {
        self.setLoading();
        
        yield EducService.deleteThing(id);

        self.data.delete(id);

        self.dropData();
        self.setLoaded();
    }),

    edit: flow(function* (id: any, payload: any) {
        self.setLoading();
        
        const received = yield EducService.editThing(id, payload);

        self.data.delete(id);
        self.data.put(received);

        self.dropData();
        self.setLoaded();
    }),

    getById(id: any) {
        return self.data.get(toString(id));
    }
}));