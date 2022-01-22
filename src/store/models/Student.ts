import { toString, cloneDeep } from "lodash";
import { types, flow, Instance } from "mobx-state-tree";
import moment from "moment";
import EducService from "../../api/EducService";
import iRootStoreProvider from "../stores/iRootStoreProvider";
import DefaultStore from "../stores/iStoreMember";

export const Student = iRootStoreProvider.props({
    id: types.identifierNumber,
    people_id: types.number,
    group_id: types.number,
    join_date: types.string,
    average_cost: types.number,
    leave_date: types.string,
    passed_semesters: types.array(types.number)
}).views(self => ({
    get people() {
        return self.peopleStore.getById(self.people_id);
    },

    get group() {
        return self.groupsStore.getById(self.group_id);
    }
})).views(self => ({
    get firstName() {
        return self.people?.firstname;
    },

    get lastName() {
        return self.people?.lastname;
    },

    get joinDate() {
        return moment().isAfter(moment(self.join_date)) ? self.join_date : self.join_date + " (Оринтировачно)";
    },

    get leaveDate() {
        return moment().isBefore(moment(self.leave_date)) ? self.leave_date : self.leave_date + " (Оринтировачно)";
    },

    get age() {
        return moment().diff(self.people?.birthdate, 'years');
    },

    get semestersCount() {
        return self.passed_semesters.length;
    },

    get result() {
        return self.average_cost === 0 ? "Нет отчетностей" : self.average_cost;
    },

    get passedSemesters() {
        return self.passed_semesters.map((e: any) => self.semestersStore.getById(e));
    }
})).views(self => ({
    get passedSemestersCount() {
        const now = moment();
        return self.passedSemesters.filter(e => e != null && moment(e.end_date).isBefore(now)).length + 1;
    },

    get fullname() {
        return self.people.fullname;
    }
})).views(self => ({
    get display() {
        return self.fullname + " (" + self.group.name + ")";
    }
}))

export interface IStudentStore extends Instance<typeof StudentStore> {}

export const StudentStore = DefaultStore
    .named("StudentStore")
    .props({
        data: types.map(Student),
        received: types.array(Student)
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
            return input.map(e => e.student_id);
        },

        containsAllIds(input: number[]): boolean {
            return input.every(e => self.data.has(toString(e)));
        },

        fetchRelations: flow(function* (input: any[]) {
            const recieved = self.getUnreqestedData(input);
            const groupsStore = self.groupsStore;
            const peopleStore = self.peopleStore;
            const statementsStore = self.statementsStore;

            if(recieved.length > 0) {
                const specialityIds = groupsStore.extractIds(recieved);
                const peopleIds = peopleStore.extractIds(recieved);

                if(!groupsStore.containsAllIds(specialityIds)) {
                    yield groupsStore.fetchByIds(specialityIds);
                }

                if(!peopleStore.containsAllIds(peopleIds)) {
                    yield peopleStore.fetchByIds(peopleIds);
                }

                yield statementsStore.fetchBuStudentIds(recieved.map(e => e.id));
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
        
        const response = yield EducService.findStudents(self.byIdFilter(ids));

        yield self.fetchRelations(response.content);

        for(const current of response.content) {
            self.data.put(current);
        }

        self.dropData();
        self.setLoaded();
    }),

    fetch: flow(function* () {
        const response = yield EducService.findStudents(self.pageFilter());

        yield self.fetchRelations(response.content);

        for(const current of response.content) {
            self.data.put(current);
        }

        self.dropData();
        self.pageProcess(response);
    }),

    add: flow(function* (payload: any) {
        self.setLoading();
        
        const received = yield EducService.addStudent(payload);

        self.data.put(received);

        self.dropData();
        self.setLoaded();
    }),

    delete: flow(function* (id: any) {
        self.setLoading();
        
        yield EducService.deleteStudent(id);

        self.data.delete(id);

        self.dropData();
        self.setLoaded();
    }),

    edit: flow(function* (id: any, payload: any) {
        self.setLoading();
        
        const received = yield EducService.editStudent(id, payload);

        self.data.delete(id);
        self.data.put(received);

        self.dropData();
        self.setLoaded();
    }),

    getById(id: any) {
        return self.data.get(toString(id));
    }
}));