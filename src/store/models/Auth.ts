import { Instance, types } from "mobx-state-tree";
import iRootStoreProvider from "../stores/iRootStoreProvider";

export interface IAuth extends Instance<typeof Auth> {

}

export const Auth = iRootStoreProvider
    .props({
        token: types.string,
        expires_in: types.integer
    })
.views(self => ({

}));