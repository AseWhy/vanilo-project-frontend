import { toString } from "lodash";
import { flow, Instance, types } from "mobx-state-tree";
import { CloudFilterOperator } from "../../../api/CloudFilter";
import VaniloService from "../../../api/VaniloService";
import { Disk, IDisk } from "../../models/Disk";
import DefaultStore from "../DefaultStore";
import { ISongStore } from "./SongStore";

export interface IDiskStore extends Instance<typeof DiskStore> {

}

export const DiskStore = DefaultStore
    .named("DiskStore")
    .props({
        data: types.map(Disk)
    })
    .views(self => ({
        getById(id: number): IDisk | undefined {
            return self.data.get(toString(id));
        },

        getByCollectionId(diskIcollectionId: number): IDisk[] {
            return Array.from(self.data.values()).filter(item => item.collection_id === diskIcollectionId);
        }
    }))
    .actions(self => ({
        fetchRelations: flow(function* (content: any[]) {
            const songStore = self.rootStore.songStore as ISongStore;

            yield songStore.fetchByDisks(songStore.getIdsFromEntities(content));
        })
    }))
.actions(self => ({
    fetchByCollections: flow(function* (collectionIds: number[]) {
        if(collectionIds.every(id => self.getByCollectionId(id).length > 0)) {
            return;
        }

        self.loading();

        const disks = yield VaniloService.findDisks(self.byAttrFilter("collectionId", CloudFilterOperator.In, collectionIds));
        const content = disks.content;

        for(const current of content) {
            self.data.put(current);
        }

        yield self.fetchRelations(content);

        self.loaded();
    })
}))