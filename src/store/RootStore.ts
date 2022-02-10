import { types, Instance, flow } from "mobx-state-tree";
import { createContext } from "react";
import VaniloService from "../api/VaniloService";
import { Auth } from "./models/Auth";
import { Cart } from "./models/Cart";
import { CurrentUser } from "./models/CurrentUser";
import DefaultStore from "./stores/DefaultStore";
import { toast } from "react-toastify";
import { commonHistory } from "../config";
import ServiceRouter from "../router/ServiceRoute";
import { CollectionStore } from "./stores/impl/CollectionStore";
import { DiskStore } from "./stores/impl/DiskStore";
import { SongStore } from "./stores/impl/SongStore";
import { CartItemStore } from "./stores/impl/CartItemStore";
import { AuthorStore } from "./stores/impl/AuthorStore";
import { OrderItemStore } from "./stores/impl/OrderItemStore";
import { OrderStore } from "./stores/impl/OrderStore";

export interface IRootStore extends Instance<typeof RootStore> {

}

export const RootStore = DefaultStore
    .props({
        user: types.maybeNull(CurrentUser),
        auth: types.maybeNull(Auth),
        cart: types.maybeNull(Cart),

        collectionStore: types.optional(CollectionStore, {}),
        diskStore: types.optional(DiskStore, {}),
        songStore: types.optional(SongStore, {}),
        cartItemStore: types.optional(CartItemStore, {}),
        authorStore: types.optional(AuthorStore, {}),
        orderItemsStore: types.optional(OrderItemStore, {}),
        orderStore: types.optional(OrderStore, {})
    })
    .actions(self => ({
        logout() {
            self.user = null;
            self.cart = null;
            self.auth = null;

            localStorage.removeItem("token");
            localStorage.removeItem("token_expires");

            commonHistory.push(ServiceRouter.loginPage.routeWithoutParams);
        }
    }))
    .actions(self => ({
        updateAuth() {
            localStorage.setItem("token", self.auth?.token as string);
            localStorage.setItem("token_expires", (self.auth?.expires_in ?? "0").toString());
        },
        
        fetchCurrentUser: flow(function* (errorly: boolean) {
            self.loading();

            if(self.user == null) {
                try {
                    self.user = yield VaniloService.me();
                } catch(e: any) {
                    console.log(e);

                    if(e.code === 401) {
                        self.logout();
                    } else if(errorly) {
                        toast(e.message, { type: "error" });
                    }
                }
            }

            try {
                if(self.user != null) {
                    self.cart = yield VaniloService.meCart();
                    
                    yield self.cartItemStore.fetchItemsByCart();
                }
            } catch(e: any){
                console.error(e);
            }
            
            self.loaded();
        })
    }))
.actions(self => ({
    registerUser: flow(function* (values: any) {
        self.loading();
        
        try {
            self.user = yield VaniloService.register(values);
            self.auth = yield VaniloService.login(values);

            self.updateAuth();

            yield self.fetchCurrentUser(true);
        } catch(e: any) {
            toast(e.message, { type: "error" });
        }

        self.loaded();
    }),

    loginUser: flow(function* (values: any) {
        self.loading();

        try {
            self.auth = yield VaniloService.login(values);

            self.updateAuth();

            yield self.fetchCurrentUser(true);
        } catch(e: any) {
            if(e?.code === 401) {
                toast("Логин или пароль неправильный", { type: "error" });
            } else {
                toast(e?.message, { type: "error" });
            }
        }

        self.loaded();
    }),

    requireGoToLogin() {
        const token = localStorage.getItem("token");
        const expires = localStorage.getItem("token_expires");

        if(expires != null && token != null) {
            const expires_pure = parseInt(expires);

            if(Date.now() / 1000 < expires_pure) {
                return false;
            } else {
                self.logout();

                return true;
            }
        } else {
            self.logout();

            return true;
        }
    }
}))

export const RootStoreContext = createContext<null | IRootStore>(null);

export const Provider = RootStoreContext.Provider;