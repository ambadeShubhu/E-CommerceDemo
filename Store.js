import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import loginReducer from './src/redux/reducer/login.reducer';
import productReducer from './src/redux/reducer/product.reducer';
import thunk from 'redux-thunk';
import {logger} from './src/middleWare/Logger';
import cartReducer from './src/redux/reducer/cart.reducer';
import favoriteReducer from './src/redux/reducer/favorite.reducer';

const persistConfig = {
  key: 'login',
  storage: AsyncStorage,
  whitelist: ['token'],
};

const persistConfigFavoriteItem = {
  key: 'favoriteItem',
  storage: AsyncStorage,
  whitelist: ['favItemBulk', 'cartBulk'],
};

const rootReducer = combineReducers({
  productData: productReducer,
  loginReducer: persistReducer(persistConfig, loginReducer),
  favoriteItem: persistReducer(persistConfigFavoriteItem, favoriteReducer),
  cartData: persistReducer(persistConfigFavoriteItem, cartReducer),
});

const enhancers = [applyMiddleware(thunk), applyMiddleware(logger)];

export const store = createStore(rootReducer, undefined, compose(...enhancers));
export const Persistor = persistStore(store);
