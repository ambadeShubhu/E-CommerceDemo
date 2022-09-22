export const GET_PRODUCTS = 'GET_PRODUCTS';
export const LOADER = 'LOADER';

export const productList = limit => {
  // console.log('----', limit);
  try {
    return async dispatch => {
      const result = await fetch(
        `https://fakestoreapi.com/products?limit=${limit}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      // dispatch({
      //   type: LOADER,
      //   // payload: true,
      // });
      const json = await result.json();
      // console.log('===>>', json);
      if (json) {
        dispatch({
          type: GET_PRODUCTS,
          payload: json,
        });
        console.log('data load successfully', json.length);
      } else {
        console.log('enable to fetch');
      }
    };
  } catch (error) {
    console.log(error);
  }
};
