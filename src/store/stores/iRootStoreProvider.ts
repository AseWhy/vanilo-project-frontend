import { types } from "mobx-state-tree";
import { rootStore } from "../..";
import { IGroupStore } from "../models/Group";
import { IPeopleStore } from "../models/People";
import { ISemesterStore } from "../models/Semester";
import { ISpecialityStore } from "../models/Speciality";
import { IStatementStore } from "../models/Statement";
import { IStudentStore } from "../models/Student";
import { ITeacherStore } from "../models/Teacher";
import { IThingStore } from "../models/Thing";
import { IRootStore } from "../RootStore";

export default types.model()
    .views(self => ({
        get rootStore(): IRootStore{
            return rootStore;
        }
    }))
.views(self => ({
    // 
    // Использовать в моделях (тс ругается когда типы ссылаются на себя сами)
    // 

    get studentsStore(): any {
        return self.rootStore.Students;
    },

    get peopleStore(): any {
        return self.rootStore.Peoples;
    },

    get specialityStore(): any {
        return self.rootStore.Speciality;
    },

    get groupsStore(): any {
        return self.rootStore.Groups;
    },

    get semestersStore(): any {
        return self.rootStore.Semester;
    },

    get teacherStore(): any {
        return self.rootStore.Teacher;
    },

    get thingsStore(): any {
        return self.rootStore.Things;
    },

    get statementsStore(): any {
        return self.rootStore.Statement;
    },

    // 
    // Где угодно кроме моделей
    // 
    
    get studentsStoreCast(): IStudentStore {
        return self.rootStore.Students;
    },

    get peopleStoreCast(): IPeopleStore {
        return self.rootStore.Peoples;
    },

    get specialityStoreCast(): ISpecialityStore {
        return self.rootStore.Speciality;
    },

    get groupsStoreCast(): IGroupStore {
        return self.rootStore.Groups;
    },

    get semestersStoreCast(): ISemesterStore {
        return self.rootStore.Semester;
    },

    get teacherStoreCast(): ITeacherStore {
        return self.rootStore.Teacher;
    },

    get thingsStoreCast(): IThingStore {
        return self.rootStore.Things;
    },

    get statementsStoreCast(): IStatementStore {
        return self.rootStore.Statement;
    }
}));