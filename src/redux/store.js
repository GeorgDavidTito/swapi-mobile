import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import Reactotron from 'reactotron-react-native';
import thunk from 'redux-thunk';
import { reactotronRedux } from 'reactotron-redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import ships from './ships/reducer';
import pilots from './pilots/reducer';
import shipPilots from './shipPilots/reducer';
import pilotShips from './pilotShips/reducer';

const iReactotron = Reactotron.configure({ name: 'Swapi Test' })
  .use(reactotronRedux())
  .connect();

const reducers = combineReducers({
  ships,
  pilots,
  shipPilots,
  pilotShips,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['home', 'mainList'],
};

const pReducer = persistReducer(persistConfig, reducers);

const middlewares = [];
const enhancers = [];

/* ------------- Thunk Middleware ------------- */
middlewares.push(thunk);

/* ------------- Assemble Middleware ------------- */
enhancers.push(applyMiddleware(...middlewares));

if (__DEV__ && iReactotron.createEnhancer) {
  enhancers.push(iReactotron.createEnhancer());
}

// In DEV mode, we'll create the store through Reactotron if(features.reduxpersist) { _%>persistedReducer<%_ }
const store = createStore(pReducer, compose(...enhancers));
const persistor = persistStore(store);

if (__DEV__ && iReactotron.setReduxStore) {
  iReactotron.setReduxStore(store);
}

export { store, persistor };
