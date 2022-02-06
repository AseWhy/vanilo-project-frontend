import { sortBy, toString } from "lodash";
import { flow, Instance, types } from "mobx-state-tree";
import VaniloService from "../../../api/VaniloService";
import { Collection, ICollection } from "../../models/Collection";
import DefaultStore from "../DefaultStore";
import { IAuthorStore } from "./AuthorStore";
import { IDiskStore } from "./DiskStore";

export interface ICollectionStore extends Instance<typeof CollectionStore> {

}

export const CollectionStore = DefaultStore
    .named("CollectionSotre")
    .props({
        data: types.map(Collection)
    })
    .views(self => ({
        toArray() {
            return sortBy(Array.from(self.data.values()), "id")
        }
    }))
    .actions(self => ({
        getById(id: number): ICollection | undefined {
            return self.data.get(toString(id));
        },

        fetchRelations: flow(function* (content: any[]) {
            const diskStore = self.rootStore.diskStore as IDiskStore;
            const authorStore = self.rootStore.authorStore as IAuthorStore;

            yield authorStore.fethByIds(content.map((e: any) => e.author_id));
            yield diskStore.fetchByCollections(diskStore.getIdsFromEntities(content));
        })
    }))
.actions(self => ({
    fetch: flow(function* (): any {
        self.loading();

        const collections = yield VaniloService.findCollections({});
        const content = collections.content;

        for(const current of content) {
            self.data.put(current);
        }

        self.fetchRelations(content);

        self.loaded();
    }),

    fetchById: flow(function* (id: number): any {
        if(self.data.has(toString(id))) {
            return;
        }

        self.loading();

        const collections = yield VaniloService.findCollections(self.byIdFilter([ id ]));
        const content = collections.content;

        for(const current of content) {
            self.data.put(current);
        }

        self.fetchRelations(content);

        self.loaded();
    }),

    fetchByIds: flow(function* (ids: number[]): any {
        if(ids.every(e => self.getById(e) != null)) {
            return;
        }

        self.loading();

        const collections = yield VaniloService.findCollections(self.byIdFilter(ids));
        const content = collections.content;

        for(const current of content) {
            self.data.put(current);
        }

        self.fetchRelations(content);

        self.loaded();
    })
}))