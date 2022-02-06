import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useRoot } from "../../../../config/hooks"
import { ICollection } from "../../../../store/models/Collection";

import "../../../../assets/collections.css";

import { CloudServiceInstance } from "../../../../api/CloudService";
import { Link } from "react-router-dom";
import ServiceRouter from "../../../../router/ServiceRoute";

export default observer(() => {
    const rootSotre = useRoot();
    const collectionStore = rootSotre.collectionStore;

    useEffect(() => {
        collectionStore.fetch();
    }, [ collectionStore ])

    return <div className="colections_root">
        {
            collectionStore.toArray().map((collection: ICollection) => 
                <div
                    style={
                        {
                            backgroundImage: `url(${CloudServiceInstance.storage(collection.poster ?? "")})`
                        }
                    }
                    className="collection_card_root"
                    key={collection.id}
                >
                    <div className="collection_card_wrapper">
                        <div className="collection_card_formatter">
                            <div className="collection_header">
                                <div className="collection_author_name">
                                    { collection.author?.name }
                                </div>
                
                                <div className="collection_meta">
                                    <div className="collection_name">
                                        { collection.name }
                                    </div>
                
                                    <div className="collection_track_count">
                                        { collection.tracks?.length } Track
                                    </div>
                                </div>
                            </div>
                
                            <Link to={ServiceRouter.detailsPage.route({
                                id: collection.id
                            })}>
                                <div className="collection_about">
                                    About
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        }
    </div>
})