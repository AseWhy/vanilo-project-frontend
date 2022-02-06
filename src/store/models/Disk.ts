import { sortBy } from "lodash";
import { Instance, types } from "mobx-state-tree";
import iRootStoreProvider from "../stores/iRootStoreProvider";
import { ISong } from "./Song";

export interface IDisk extends Instance<typeof Disk> {

}

export const Disk = iRootStoreProvider
    .props({
        id: types.identifierNumber,
        author_id: types.integer,
        collection_id: types.integer
    })
.views(self => ({
    get songs(): ISong[] {
        return sortBy(self.rootStore.songStore.getByDiskId(self.id), "order");
    }
}));