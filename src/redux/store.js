import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import Reactotron from 'reactotron-react-native';
import thunk from 'redux-thunk';
import { reactotronRedux } from 'reactotron-redux';

const iReactotron = Reactotron.configure({ name: 'Swapi Test' })
  .use(reactotronRedux()) //  <- here i am!
  .connect(); //Don't forget about me!

/* <%_ if(features.reduxpersist) { _%>
import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';
import {
  seamlessImmutableReconciler,
  seamlessImmutableTransformCreator
} from 'redux-persist-seamless-immutable';
<%_ } _%> */
/*<%_ if(features.reduxpersist) { _%>
const transformerConfig = {
  whitelistPerReducer: {
  <%_ if(features.loginandsignup) { _%>
    auth: ['currentUser']
  <%_ } _%>
  }
};
 const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [<%_ if(features.loginandsignup) { _%>'auth'<%_ } _%>],
  stateReconciler: seamlessImmutableReconciler,
  transforms: [seamlessImmutableTransformCreator(transformerConfig)]
};
<%_ } _%> */

const reducers = combineReducers({});
/* <%_ if(features.reduxpersist) { _%>
const persistedReducer = persistReducer(persistConfig, reducers);
<%_ } _%> */

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
const store = createStore(reducers, compose(...enhancers));

if (__DEV__ && iReactotron.setReduxStore) {
  iReactotron.setReduxStore(store);
}

export default store;
