import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useRoot } from "../../../../config/hooks"

import Preloader from "../../../Preloader";
import { CloudServiceInstance } from "../../../../api/CloudService";
import NotFoundPage from "../../../NotFoundPage";
import stock from "../../../../assets/vector/stock.svg";

import "../../../../assets/main.css"
import DetailesDIsks from "./DetailesDIsks";

import "../../../../assets/details.css";
import { observer } from "mobx-react-lite";

export default observer(() => {
    const rootStore = useRoot();
    const { id } = useParams() as any;
    const collectionStore = rootStore.collectionStore;
    const cart = rootStore.cart;
    const collection = collectionStore.getById(id);

    useEffect(() => {
        if(id != null) {
            collectionStore.fetchById(id);
        }
    }, [ id, collectionStore ]);

    if(collectionStore.isLoading) {
        return <Preloader/>;
    }

    if(collection == null) {
        return <NotFoundPage/>
    }

    return <div className="content_wrapper">
        <div className="poster_header">
            <div className="poster_images">
                <img
                    src={CloudServiceInstance.storage(collection.poster)}
                    alt={"poster"}
                    className="poster-current-content"
                />

                <div className="poster_attachments">
                    {
                        collection.attachments.slice(0, 3).map(
                            (image, i) => <img
                                src={CloudServiceInstance.storage(image)}
                                alt={"attachemnt-" + i}
                                key={i}
                                className="poster-attachment-content"
                            />
                        )
                    }
                </div>
            </div>

            <div className="collection_info">
                <h1 className="collection_author_header">
                    { collection.author?.name }
                </h1>

                <h3 className="collection_name">
                    { collection.name }
                </h3>

                <div className="collection_actions">
                    <div className="collection_meta">
                        <p> Country: { collection.lang } </p>
                        <p> Condition: { collection.condition } </p>
                        <p> EAN / UPC: { collection.eanupc } </p>
                        <p> Number of records: { collection.disks.length } </p>
                        <p> The size of the records: { collection.songs.length } </p>
                        <p> Label: { collection.label } </p>
                        <p> Year of publication: { collection.year } </p>
                    </div>

                    {
                        collection?.availability? 
                            <div className="collection_buy">
                                <img
                                    src={stock}
                                    alt="stock"
                                />

                                <p>
                                    {collection.cost.toFixed(2)}$ / set
                                </p>

                                {
                                    !cart?.containsItem(collection) ?? false ?
                                        <button
                                            className="collection_add_in_cart"
                                            onClick={() => cart?.addItem(collection)}
                                        >
                                            Add in cart
                                        </button> :
                                        <div className="collection_in_cart">
                                            In cart
                                        </div>
                                }
                            </div> : null
                    }
                </div>
            </div>
        </div>

        <hr/>

        <div className="collection_description">
            <div className="collection_description_header">
                Description vinyl record { collection.fullname }
            </div>

            <div className="collection_description_body">
                { collection.description }
            </div>
        </div>

        <hr/>

        <div className="collection_songs">
            <div className="collection_songs_header">
               Song list:
            </div>

            <div className="collection_songs_body">
                <DetailesDIsks disks={collection.disks}/>
            </div>
        </div>
    </div>
})