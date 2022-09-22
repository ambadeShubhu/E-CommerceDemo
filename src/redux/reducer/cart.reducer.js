import {
  CART_PRODUCTS,
  REMOVE_CART_ITEM,
  INCREMENT,
  DECREMENT,
} from '../action/cart.action';

const initialState = {
  cartBulk: [],
  loading: false,
};

const cartReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    // case LOADER:
    //   return {...state, loading: true};
    case CART_PRODUCTS:
      console.log('--cartBulk-reducer-->', payload);

      return {
        ...state,
        cartBulk: state.cartBulk.concat(payload),
        loading: false,
      };
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartBulk: state.cartBulk.filter(
          item => item.cartItem.id !== payload.removeItem.id,
        ),
        loading: false,
      };

    case INCREMENT:
      state.cartBulk[payload.index].cartItem.qty =
        state.cartBulk[payload.index].cartItem.qty + 1;
      return {
        ...state,
        cartBulk: state.cartBulk.map(product =>
          product.id === payload.incrementCount.cartItem.id
            ? {...product, qty: product.qty + 1}
            : product,
        ),
      };

    case DECREMENT:
      state.cartBulk[payload.index].cartItem.qty =
        state.cartBulk[payload.index].cartItem.qty - 1;
      return {
        ...state,
        cartBulk: state.cartBulk.map(product =>
          product.id === payload.decrementCount.cartItem.id
            ? {...product, qty: product.qty - 1}
            : product,
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
