import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';

import { createLogger } from 'redux-logger';
import { Iterable } from 'immutable'
import thunk from 'redux-thunk'
import { getQuery } from './utility'
import { reducer } from './combineReducers';
import { defaultState } from './defaultState'
import createSagaMiddleWare from 'redux-saga';
import { initsagas, initSagas } from './initSagas';

const stateTransformer = (state) => {
    if (Iterable.isIterable(state)) return state.toJS();
    else return state;
};

const logger = createLogger({
    stateTransformer,
});

export const getStore = ()=>{
    const sagaMiddleWare = createSagaMiddleWare();
    const middleWares = [sagaMiddleWare, thunk];
    if (getQuery()['logger']) { middleWares.push(logger)}
    const composables = [applyMiddleware(...middleWares)]
    const enhancer = compose(
        ... composables
    );
    const store = createStore(
        reducer,
        defaultState,
        enhancer
    );

    console.log("Saga Middleware Implemented");
    initSagas(sagaMiddleWare);
    return store;
};