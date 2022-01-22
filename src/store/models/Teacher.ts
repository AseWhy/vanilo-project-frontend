import { toString, cloneDeep } from "lodash";
import { types, flow, Instance } from "mobx-state-tree";
import moment from "moment";
import EducService from "../../api/EducService";
import iRootStoreProvider from "../stores/iRootStoreProvider";
import DefaultStore from "../stores/iStoreMember";

export const Teacher = iRootStoreProvider.props({
    id: types.identifierNumber,
    people_id: types.number
}).views(self => ({
    get people() {
        return self.peopleStore.getById(self.people_id);
    }
})).views(self => ({
    get firstName() {
        return self.people?.firstname;
    },

    get lastName() {
        return self.people?.lastname;
    },

    get fullname() {
        return self.people?.fullname;
    },

    get age() {
        return moment().diff(self.people?.birthdate, 'years');
    }
})).views(self => ({
    get display() {
        return self.fullname;
    }
}))

export interface ITeacherStore extends Instance<typeof TeacherStore> {}

export const TeacherStore = DefaultStore
    .named("TeacherStore")
    .props({
        data: types.map(Teacher),
        received: types.array(Teacher)
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
            return input.map(e => e.teacher_id);
        },

        containsAllIds(input: number[]): boolean {
            return input.every(e => self.data.has(toString(e)));
        },

        fetchRelations: flow(function* (input: any[]) {
            const recieved = self.getUnreqestedData(input);
            const peopleStore = self.peopleStore;

            if(recieved.length > 0) {
                const peopleIds = peopleStore.extractIds(recieved);

                if(!peopleStore.containsAllIds(peopleIds)) {
                    yield peopleStore.fetchByIds(peopleIds);
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
        
        const response = yield EducService.findTeachers(self.byIdFilter(ids));

        yield self.fetchRelations(response.content);

        for(const current of response.content) {
            self.data.put(current);
        }

        self.dropData();
        self.setLoaded();
    }),

    fetch: flow(function* () {
        const response = yield EducService.findTeachers(self.pageFilter());

        yield self.fetchRelations(response.content);

        for(const current of response.content) {
            self.data.put(current);
        }

        self.dropData();
        self.pageProcess(response);
    }),

    add: flow(function* (payload: any) {
        self.setLoading();
        
        const received = yield EducService.addTeacher(payload);

        self.data.put(received);

        self.dropData();
        self.setLoaded();
    }),

    delete: flow(function* (id: any) {
        self.setLoading();
        
        yield EducService.deleteTeacher(id);

        self.data.delete(id);

        self.dropData();
        self.setLoaded();
    }),

    edit: flow(function* (id: any, payload: any) {
        self.setLoading();
        
        const received = yield EducService.editTeacher(id, payload);

        self.data.delete(id);
        self.data.put(received);

        self.dropData();
        self.setLoaded();
    }),

    getById(id: any) {
        return self.data.get(toString(id));
    }
}));