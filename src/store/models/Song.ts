import { Instance, types } from "mobx-state-tree";
import iRootStoreProvider from "../stores/iRootStoreProvider";

export interface ISong extends Instance<typeof Song> {

}

export const Song = iRootStoreProvider
    .props({
        id: types.identifierNumber,
        author_id: types.integer,
        collection_id: types.integer,
        disk_id: types.integer,
        name: types.string,
        order: types.integer
    })
.views(self => ({

}));