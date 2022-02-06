import { observer } from "mobx-react";
import "../../assets/icons.css";
import { useRoot } from "../../config/hooks";

export default observer(() => {
    const rootStore = useRoot();
    const items = rootStore.cart?.items ?? [];

    return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="cart-icon">
        <path d="M2 2H3.33333V10.6667H12.6667L14.6667 4H6" className="selectize" strokeLinecap="round" strokeLinejoin="round"/>
        <ellipse cx="3.99992" cy="14.0002" rx="0.666667" className="selectize" ry="0.666667" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="11.9999" cy="14.0002" r="0.666667" className="selectize" strokeLinecap="round" strokeLinejoin="round"/>

        {
            items.length > 0 ?
                <>
                    <circle cx="10" cy="6" r="6" fill="#02E118"></circle>
                    <text x="10" y="8" fontSize="7" stroke="black" textAnchor="middle"> {items.length > 99 ? items.length + "+" : items.length} </text>
                </> : null
        }
    </svg>;
})