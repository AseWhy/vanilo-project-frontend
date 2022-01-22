import { cloneDeep, toString } from "lodash";
import { types, flow, Instance } from "mobx-state-tree";
import EducService from "../../api/EducService";
import iRootStoreProvider from "../stores/iRootStoreProvider";
import DefaultStore from "../stores/iStoreMember";

export const Speciality = iRootStoreProvider.props({
    id: types.identifierNumber,
    isced: types.number,
    name: types.string,
    duration: types.number
}).views(self => ({
    get display() {
        return self.name + " (" + self.isced + ")";
    }
}))

export interface ISpecialityStore extends Instance<typeof SpecialityStore> {}

export const SpecialityStore = DefaultStore
    .named("SpecialityStore")
    .props({
        data: types.map(Speciality),
        received: types.array(Speciality)
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
            return input.map(e => e.speciality_id);
        },

        containsAllIds(input: number[]): boolean {
            return input.every(e => self.data.has(toString(e)));
        },

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
        
        const response = yield EducService.findSpeciality(self.byIdFilter(ids));

        for(const current of response.content) {
            self.data.put(current);
        }

        self.dropData();
        self.setLoaded();
    }),

    fetch: flow(function* () {
        const response = yield EducService.findSpeciality(self.pageFilter());

        for(const current of response.content) {
            self.data.put(current);
        }

        self.dropData();
        self.pageProcess(response);
    }),

    add: flow(function* (payload: any) {
        self.setLoading();
        
        const received = yield EducService.addSpeciality(payload);

        self.data.put(received);

        self.dropData();
        self.setLoaded();
    }),

    delete: flow(function* (id: any) {
        self.setLoading();
        
        yield EducService.deleteSpeciality(id);

        self.data.delete(id);

        self.dropData();
        self.setLoaded();
    }),

    edit: flow(function* (id: any, payload: any) {
        self.setLoading();
        
        const received = yield EducService.editSpeciality(id, payload);

        self.data.delete(id);
        self.data.put(received);

        self.dropData();
        self.setLoaded();
    }),

    getById(id: any) {
        return self.data.get(toString(id));
    }
}));