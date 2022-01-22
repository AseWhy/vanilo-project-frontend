import { toString, cloneDeep } from "lodash";
import { types, flow, Instance } from "mobx-state-tree";
import { CloudFilterOperator } from "../../api/CloudFilter";
import EducService from "../../api/EducService";
import iRootStoreProvider from "../stores/iRootStoreProvider";
import DefaultStore from "../stores/iStoreMember";

export const Statement = iRootStoreProvider.props({
    id: types.identifierNumber,
    result: types.number,
    thing_id: types.number,
    student_id: types.number,
    semester_id: types.number,
    teacher_id: types.number
}).views(self => ({
    get teacher() {
        return self.teacherStore.getById(self.teacher_id);
    },

    get semester() {
        return self.semestersStore.getById(self.semester_id);
    },

    get thing() {
        return self.thingsStore.getById(self.thing_id);
    }
})).views(self => ({
    get teacherFullname() {
        return self.teacher?.fullname ?? "Неизвестно";
    },

    get thingName() {
        return self.thing?.name ?? "Неизвестно";
    }
}))

export interface IStatementStore extends Instance<typeof StatementStore> {}

export const StatementStore = DefaultStore
    .named("StatementStore")
    .props({
        data: types.map(Statement),
        received: types.array(Statement)
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
            return input.map(e => e.statement_id);
        },

        containsAllIds(input: number[]): boolean {
            return input.every(e => self.data.has(toString(e)));
        },

        fetchRelations: flow(function* (input: any[]) {
            const recieved = self.getUnreqestedData(input);
            const teacherStore = self.teacherStore;
            const thingsStore = self.thingsStore;
            const statudentsStore = self.studentsStore;

            if(recieved.length > 0) {
                const teacherIds = teacherStore.extractIds(recieved);
                const thingsIds = thingsStore.extractIds(recieved);
                const statudentsIds = statudentsStore.extractIds(recieved);

                if(!teacherStore.containsAllIds(teacherIds)) {
                    yield teacherStore.fetchByIds(teacherIds);
                }

                if(!thingsStore.containsAllIds(thingsIds)) {
                    yield thingsStore.fetchByIds(thingsIds);
                }

                if(!statudentsStore.containsAllIds(statudentsIds)) {
                    yield statudentsStore.fetchByIds(statudentsIds);
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
        
        const response = yield EducService.findStatements(self.byIdFilter(ids));

        yield self.fetchRelations(response.content);

        for(const current of response.content) {
            self.data.put(current);
        }

        self.dropData();
        self.setLoaded();
    }),

    fetchBuStudentIds: flow(function* (ids: any[]) {
        const response = yield EducService.findStatements(self.byAttrFilter("studentId", CloudFilterOperator.In, ids));

        yield self.fetchRelations(response.content);

        for(const current of response.content) {
            self.data.put(current);
        }

        self.dropData();
        self.pageProcess(response);
    }),

    fetch: flow(function* () {
        const response = yield EducService.findStatements(self.pageFilter());

        yield self.fetchRelations(response.content);

        for(const current of response.content) {
            self.data.put(current);
        }

        self.dropData();
        self.pageProcess(response);
    }),

    add: flow(function* (payload: any) {
        self.setLoading();
        
        const received = yield EducService.addStatement(payload);

        self.data.put(received);

        self.dropData();
        self.setLoaded();
    }),

    delete: flow(function* (id: any) {
        self.setLoading();
        
        yield EducService.deleteStatement(id);

        self.data.delete(id);

        self.dropData();
        self.setLoaded();
    }),

    edit: flow(function* (id: any, payload: any) {
        self.setLoading();
        
        const received = yield EducService.editStatement(id, payload);

        self.data.delete(id);
        self.data.put(received);

        self.dropData();
        self.setLoaded();
    }),

    getById(id: any) {
        return self.data.get(toString(id));
    }
}));