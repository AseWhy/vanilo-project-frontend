import { toString } from "lodash";
import { flow, Instance, types } from "mobx-state-tree";
import VaniloService from "../../../api/VaniloService";
import { Author, IAuthor } from "../../models/Author";
import DefaultStore from "../DefaultStore";

export interface IAuthorStore extends Instance<typeof AuthorStore> {

}

export const AuthorStore = DefaultStore
    .named("AuthorStore")
    .props({
        data: types.map(Author)
    })
    .views(self => ({
        getById(id: number): IAuthor | undefined {
            return self.data.get(toString(id));
        }
    }))
.actions(self => ({
    fethByIds: flow(function* (ids: number[]) {
        self.loading();

        const authors = yield VaniloService.findAuthors(self.byIdFilter(ids));
        const content = authors.content;

        for(const current of content) {
            self.data.put(current);
        }

        self.loaded();
    })
}))