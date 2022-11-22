import { ADD_TO_CART } from "../../shared/constants/action-type";

const initState = {
    items: [],
}
export default (state = initState, action) => {
    switch (action.type) {
        case ADD_TO_CART: return addItem(state, action.payload);
        default: return state;
    }
}
const addItem = (state, payload) => {
    const items = state.items;
    let isProductExists = false;
    items.map((item, index) => {
        if (item._id === payload._id) {
            item.qty += payload.qty;
            isProductExists = true;
        }
        return item;
    });
    const newItems = isProductExists? items: [...items, payload];
    // localStorage.setItem("cart_items", JSON.stringify(newItems));
    return {...state, items: newItems}
}