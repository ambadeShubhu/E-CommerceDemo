import {FAVORITE_ITEM, REMOVE_FAVORITE_ITEM} from '../action/favorite.action';

const initialState = {
  favItemBulk: [],
  loading: false,
};

const favoriteReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    // case LOADER:
    //   return {...state, loading: true};
    case FAVORITE_ITEM:
      return {
        ...state,
        favItemBulk: state.favItemBulk.concat(payload),
        loading: false,
      };

    case REMOVE_FAVORITE_ITEM:
      return {
        ...state,
        favItemBulk: state.favItemBulk.filter(
          item => item.favItem.id !== payload.removeItem.id,
        ),
        loading: false,
      };
    default:
      return state;
  }
};

export default favoriteReducer;
