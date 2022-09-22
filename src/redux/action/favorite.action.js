export const FAVORITE_ITEM = 'FAVORITE_ITEM';
export const REMOVE_FAVORITE_ITEM = 'REMOVE_FAVORITE_ITEM';

export const favItemList = favItem => {
  return async dispatch => {
    dispatch({
      type: FAVORITE_ITEM,
      payload: {favItem},
    });
  };
};

export const removeFavItemList = removeItem => {
  return async dispatch => {
    dispatch({
      type: REMOVE_FAVORITE_ITEM,
      payload: {removeItem},
    });
  };
};
