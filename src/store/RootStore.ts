import { types, Instance } from "mobx-state-tree";
import { createContext } from "react";
import { GroupStore } from "./models/Group";
import { PeopleStore } from "./models/People";
import { SemesterStore } from "./models/Semester";
import { SpecialityStore } from "./models/Speciality";
import { StatementStore } from "./models/Statement";
import { StudentStore } from "./models/Student";
import { TeacherStore } from "./models/Teacher";
import { ThingStore } from "./models/Thing";

export interface IRootStore extends Instance<typeof RootStore> {}

export const RootStore = types.model({
    Students: types.optional(StudentStore, {}),
    Peoples: types.optional(PeopleStore, {}),
    Speciality: types.optional(SpecialityStore, {}),
    Groups: types.optional(GroupStore, {}),
    Semester: types.optional(SemesterStore, {}),
    Teacher: types.optional(TeacherStore, {}),
    Things: types.optional(ThingStore, {}),
    Statement: types.optional(StatementStore, {})
})

export const RootStoreContext = createContext<null | IRootStore>(null);

export const Provider = RootStoreContext.Provider;