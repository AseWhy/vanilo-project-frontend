import { types } from "mobx-state-tree";
import iStoreMember from "./iStoreMember";

export default types.compose(iStoreMember, types
    .model({
        load: types.optional(types.boolean, false)
    })
    .views(self => ({
        get isLoading(): boolean {
            return self.load;
        },

        getIdsFromEntities(identifiables: any[]) {
            return identifiables.map(e => e.id);
        }
    }))
    .actions(self => ({
        loaded() {
            if(self.load) {
                self.load = false;
            }
        },

        loading() {
            if(!self.load) {
                self.load = true;
            }
        }
    }))
);