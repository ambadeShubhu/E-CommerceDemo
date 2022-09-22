import React from 'react';
import {Platform, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import Router from './src/router';
import Toast from 'react-native-toast-message';

import {PersistGate} from 'redux-persist/lib/integration/react';
import {store, Persistor} from './Store';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="transparent" translucent />
      <Provider store={store}>
        <PersistGate loading={null} persistor={Persistor}>
          <Router />
          <Toast />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
