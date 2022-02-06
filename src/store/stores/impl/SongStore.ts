import { toString } from "lodash";
import { flow, Instance, types } from "mobx-state-tree";
import { CloudFilterOperator } from "../../../api/CloudFilter";
import VaniloService from "../../../api/VaniloService";
import { ISong, Song } from "../../models/Song";
import DefaultStore from "../DefaultStore";

export interface ISongStore extends Instance<typeof SongStore> {

}

export const SongStore = DefaultStore
    .named("SongStore")
    .props({
        data: types.map(Song)
    })
    .views(self => ({
        getById(id: number): ISong | undefined {
            return self.data.get(toString(id));
        },

        getByDiskId(diskId: number): ISong[] {
            return Array.from(self.data.values()).filter(item => item.disk_id === diskId)
        },

        getByCollectionId(songIcollectionId: number): ISong[] {
            return Array.from(self.data.values()).filter(item => item.collection_id === songIcollectionId);
        }
    }))
.actions(self => ({
    fetchByCollections: flow(function* (collectionIds: number[]) {
        if(collectionIds.every(id => self.getByCollectionId(id).length > 0)) {
            return;
        }

        self.loading();

        const disks = yield VaniloService.findSongs(self.byAttrFilter("collectionId", CloudFilterOperator.In, collectionIds));
        const content = disks.content;

        for(const current of content) {
            self.data.put(current);
        }

        self.loaded();
    }),
    
    fetchByDisks: flow(function* (diskIds: number[]) {
        if(diskIds.every(id => self.getByDiskId(id).length > 0)) {
            return;
        }

        self.loading();

        const disks = yield VaniloService.findSongs(self.byAttrFilter("diskId", CloudFilterOperator.In, diskIds));
        const content = disks.content;

        for(const current of content) {
            self.data.put(current);
        }

        self.loaded();
    })
}))