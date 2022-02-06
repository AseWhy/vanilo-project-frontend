import CloudService from "./CloudService";

export default new class VaniloService extends CloudService {
    public constructor() {
        super("api");
    }

    public me() {
        return this.baseErrorCheck(this.get("/auth/current"));
    }

    public meCart() {
        return this.baseErrorCheck(this.get("/auth/current/cart"));
    }

    public register(payload: any) {
        return this.baseErrorCheck(this.post("/auth/register", payload, {}, false));
    }

    public login(payload: any) {
        return this.baseErrorCheck(this.post("/auth/auth", payload, {}, false));
    }

    public deleteCartItem(id: number) {
        return this.baseErrorCheck(this.delete("/_items/" + id));
    }

    public editCartItem(id: number, payload: any) {
        return this.baseErrorCheck(this.post("/cart_items/" + id, payload));
    }

    public findOrderItems(filter: any) {
        return this.baseErrorCheck(this.post("/order_items", filter));
    }

    public findOrders(filter: any) {
        return this.baseErrorCheck(this.post("/orders", filter));
    }

    public findTracks(filter: any) {
        return this.baseErrorCheck(this.post("/tracks", filter));
    }

    public findDisks(filter: any) {
        return this.baseErrorCheck(this.post("/disks", filter));
    }

    public findSongs(filter: any) {
        return this.baseErrorCheck(this.post("/songs", filter));
    }

    public findAuthors(filter: any) {
        return this.baseErrorCheck(this.post("/authors", filter));
    }

    public findCollections(filter: any) {
        return this.baseErrorCheck(this.post("/collections", filter));
    }

    public addItemToCart(cartId: number, payload: any) {
        return this.baseErrorCheck(this.put("/carts/" + cartId + "/items", payload));
    }

    public getCartItems(cartId: number) {
        return this.baseErrorCheck(this.post("/carts/" + cartId + "/items"));
    }

    public getOrderItems(orderId: number) {
        return this.baseErrorCheck(this.post("/orders/" + orderId + "/items"));
    }

    public addOrder() {
        return this.baseErrorCheck(this.put("/auth/current/orders"));
    }
}();