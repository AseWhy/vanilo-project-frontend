import CloudService from "./CloudService";

export default new class EducService extends CloudService {
    public constructor() {
        super("api");
    }

    public editPeople(id: any, payload: any) {
        return this.baseErrorCheck(this.put("/peoples/" + id, payload));
    }

    public deletePeople(id: any) {
        return this.baseErrorCheck(this.delete("/peoples/" + id));
    }

    public addPeople(payload: any) {
        return this.baseErrorCheck(this.put("/peoples", payload));
    }

    public findPeoples(filter: any) {
        return this.baseErrorCheck(this.post("/peoples", filter));
    }

    //

    public editStudent(id: any, payload: any) {
        return this.baseErrorCheck(this.put("/students/" + id, payload));
    }

    public deleteStudent(id: any) {
        return this.baseErrorCheck(this.delete("/students/" + id));
    }

    public addStudent(payload: any) {
        return this.baseErrorCheck(this.put("/students", payload));
    }

    public findStudents(filter: any) {
        return this.baseErrorCheck(this.post("/students", filter));
    }

    //

    public editSpeciality(id: any, payload: any) {
        return this.baseErrorCheck(this.put("/specialities/" + id, payload));
    }

    public deleteSpeciality(id: any) {
        return this.baseErrorCheck(this.delete("/specialities/" + id));
    }

    public addSpeciality(payload: any) {
        return this.baseErrorCheck(this.put("/specialities", payload));
    }

    public findSpeciality(filter: any) {
        return this.baseErrorCheck(this.post("/specialities", filter));
    }

    //

    public editGroup(id: any, payload: any) {
        return this.baseErrorCheck(this.put("/groups/" + id, payload));
    }

    public deleteGroup(id: any) {
        return this.baseErrorCheck(this.delete("/groups/" + id));
    }

    public addGroup(payload: any) {
        return this.baseErrorCheck(this.put("/groups", payload));
    }

    public findGroups(filter: any) {
        return this.baseErrorCheck(this.post("/groups", filter));
    }

    //

    public editSemester(id: any, payload: any) {
        return this.baseErrorCheck(this.put("/semesters/" + id, payload));
    }

    public deleteSemester(id: any) {
        return this.baseErrorCheck(this.delete("/semesters/" + id));
    }

    public addSemester(payload: any) {
        return this.baseErrorCheck(this.put("/semesters", payload));
    }

    public findSemesters(filter: any) {
        return this.baseErrorCheck(this.post("/semesters", filter));
    }

    ///

    public editTeacher(id: any, payload: any) {
        return this.baseErrorCheck(this.put("/teachers/" + id, payload));
    }

    public deleteTeacher(id: any) {
        return this.baseErrorCheck(this.delete("/teachers/" + id));
    }

    public addTeacher(payload: any) {
        return this.baseErrorCheck(this.put("/teachers", payload));
    }

    public findTeachers(filter: any) {
        return this.baseErrorCheck(this.post("/teachers", filter));
    }

    //

    public editThing(id: any, payload: any) {
        return this.baseErrorCheck(this.put("/things/" + id, payload));
    }

    public deleteThing(id: any) {
        return this.baseErrorCheck(this.delete("/things/" + id));
    }

    public addThing(payload: any) {
        return this.baseErrorCheck(this.put("/things", payload));
    }

    public findThings(filter: any) {
        return this.baseErrorCheck(this.post("/things", filter));
    }

    //

    public editStatement(id: any, payload: any) {
        return this.baseErrorCheck(this.put("/statements/" + id, payload));
    }

    public deleteStatement(id: any) {
        return this.baseErrorCheck(this.delete("/statements/" + id));
    }

    public addStatement(payload: any) {
        return this.baseErrorCheck(this.put("/statements", payload));
    }

    public findStatements(filter: any) {
        return this.baseErrorCheck(this.post("/statements", filter));
    }
}();