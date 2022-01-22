import { types } from "mobx-state-tree";
import iStoreMember from "./iStoreMember";

export default types.compose(iStoreMember, types
    .model()
    .views(self => ({

    }))
);