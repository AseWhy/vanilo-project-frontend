import { Instance, types } from "mobx-state-tree";
import iRootStoreProvider from "../stores/iRootStoreProvider";

export interface IAuthor extends Instance<typeof Author> {

}

export const Author = iRootStoreProvider
    .props({
        id: types.identifierNumber,
        name: types.maybeNull(types.string)
    })
.views(self => ({

}));