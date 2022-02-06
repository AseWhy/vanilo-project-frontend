import { types } from "mobx-state-tree";
import { rootStore } from "../..";
import { IRootStore } from "../RootStore";

export default types.model()
    .views(self => ({
        get rootStore(): IRootStore{
            return rootStore;
        }
    }))
.views(self => ({

}));