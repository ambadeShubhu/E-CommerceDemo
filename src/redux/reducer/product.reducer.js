import {GET_PRODUCTS} from '../action/product.action';

const initialState = {
  productBulk: [],
  loading: false,
};

const productReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    // case LOADER:
    //   return {...state, loading: true};
    case GET_PRODUCTS:
      return {...state, productBulk: payload, loading: false};
    default:
      return state;
  }
};

export default productReducer;

// export const productListSelector = state => state.productData.productBulk;
