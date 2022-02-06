import { Instance, types } from "mobx-state-tree";
import moment from "moment";
import iRootStoreProvider from "../stores/iRootStoreProvider";
import { IAuthor } from "./Author";
import { IDisk } from "./Disk";
import { ISong } from "./Song";

export interface ICollection extends Instance<typeof Collection> {

}

export const Collection = iRootStoreProvider
    .props({
        id: types.identifierNumber,
        lang: types.string,
        publish_date: types.string,
        author_id: types.integer,
        number_of_records: types.integer,
        availability: types.boolean,
        name: types.string,
        poster: types.string,
        attachments: types.array(types.string),
        description: types.maybeNull(types.string),
        cost: types.number,
        eanupc: types.string,
        label: types.string,
        condition: types.enumeration([ 'new' ])
    })
    .views(self => ({
        get year() {
            return moment(self.publish_date).get("year");
        },

        get tracks(): ISong[] {
            return self.rootStore.songStore.getByCollectionId(self.id);
        },
        
        get disks(): IDisk[] {
            return self.rootStore.diskStore.getByCollectionId(self.id);
        },

        get songs(): ISong[] {
            return self.rootStore.songStore.getByCollectionId(self.id);
        },

        get author(): IAuthor | undefined {
            return self.rootStore.authorStore.getById(self.author_id);
        },

        get images(): string[] {
            return [ self.poster, ...self.attachments ];
        }
    }))
.views(self => ({
    get fullname() {
        return self.author?.name + " - " + self.name;
    }
}));