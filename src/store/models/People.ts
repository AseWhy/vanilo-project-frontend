import { types, flow, Instance } from "mobx-state-tree";
import EducService from "../../api/EducService";
import DefaultStore from "../stores/iStoreMember";
import { cloneDeep, toString } from "lodash";

export const People = types.model({
    id: types.identifierNumber,
    firstname: types.optional(types.string, ""),
    lastname: types.optional(types.string, ""),
    birthdate: types.optional(types.string, "")
}).views(self => ({
    get display() {
        return self.lastname + " " + self.firstname + " (" + self.id + ")";
    },

    get fullname() {
        return self.lastname + " " + self.firstname;
    }
}))

export interface IPeopleStore extends Instance<typeof PeopleStore> {}

export const PeopleStore = DefaultStore
    .named("PeopleStore")
    .props({
        data: types.map(People),
        received: types.array(People)
    })
    .views(self => ({
        get pure(): any {
            return self.received;
        },

        get raw(): any {
            return cloneDeep(self.received.slice());
        }
    }))
    .actions(self => ({
        extractIds(input: any[]): number[] {
            return input.map(e => e.people_id);
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
        
        const response = yield EducService.findPeoples(self.byIdFilter(ids));

        for(const current of response.content) {
            self.data.put(current);
        }
        
        self.dropData();
        self.setLoaded();
    }),

    fetch: flow(function* () {
        self.setLoading();

        const response = yield EducService.findPeoples(self.pageFilter());

        for(const current of response.content) {
            self.data.put(current);
        }

        self.dropData();
        self.pageProcess(response);
    }),

    add: flow(function* (payload: any) {
        self.setLoading();
        
        const received = yield EducService.addPeople(payload);

        self.data.put(received);

        self.dropData();
        self.setLoaded();
    }),

    delete: flow(function* (id: any) {
        self.setLoading();
        
        yield EducService.deletePeople(id);

        self.data.delete(id);

        self.dropData();
        self.setLoaded();
    }),

    edit: flow(function* (id: any, payload: any) {
        self.setLoading();
        
        const received = yield EducService.editPeople(id, payload);

        self.data.delete(id);
        self.data.put(received);

        self.dropData();
        self.setLoaded();
    }),

    getById(id: any) {
        return self.data.get(toString(id));
    }
}));