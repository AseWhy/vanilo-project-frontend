import { useRoot } from "../../../../config/hooks";
import CartItemRow from "./OrderItemRow";
import { observer } from "mobx-react";
import Preloader from "../../../Preloader";
import avatar from "../../../../assets/raster/void_avatar.png";

import "../../../../assets/profile.css";
import moment from "moment";
import { isEmpty } from "lodash";
import { useEffect } from "react";

export default observer(() => {
    const rootStore = useRoot();
    const orderStore = rootStore.orderStore;
    const profile = rootStore.user;
    const items = rootStore.orderItemsStore.iterable;

    useEffect(() => {
        if(profile != null) {
            orderStore.fetchOrdersByUser();
        }
    }, [ profile, orderStore ])

    if(rootStore.isLoading) {
        return <Preloader/>
    }

    console.log(profile?.orderItems)

    return <div className="profile_root">
        <h1>
            Profile
        </h1>

        <hr/>

        <div className="profile_main_part">
            <div className="profile_main_data">
                <div className="profile_image_wrapper">
                    <img
                        src={avatar}
                        alt="avatar"
                    />
                </div>

                <div className="profile_personal_wrapper">
                    <div className="profile_personal_header">
                        Personal Data
                    </div>

                    <p> <span>Name</span>: { profile?.last_name } </p>
                    <p> <span>First name</span>: { profile?.first_name } </p>
                    <p> <span>Date of birth</span>: { moment(profile?.date_of_birth).format("yyyy.MM.DD") } </p>
                    <p> <span>Number phone</span>: { isEmpty(profile?.phone) ? "NONE" : profile?.phone } </p>
                    <p> <span>Mail</span>: { isEmpty(profile?.email) ? "NONE" : profile?.email } </p>
                </div>
            </div>


            <div className="main_actions_wrapper">
                <button
                    className="logout_action"
                    onClick={() => rootStore.logout()}
                >
                    logout
                </button>
            </div>
        </div>

        <hr/>

        {
            rootStore.orderItemsStore.isLoading ?
                <Preloader/> :
                (items.length ?? 0) > 0 ?
                    items.map((item, i) => 
                        <CartItemRow item={item} key={i}/>    
                    ) :
                    <p className="no_items_label">
                        No orders yet...
                    </p>
        }
    </div>
});