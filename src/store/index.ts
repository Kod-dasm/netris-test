import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { AllEffect, ForkEffect, all } from 'redux-saga/effects';

const defaultRootReducer = combineReducers({});

function* rootSaga(): Generator<AllEffect<ForkEffect<void>>> {
  return yield all([]);
}

const sagaMiddleware = createSagaMiddleware();

const appStore = configureStore({
  reducer: defaultRootReducer,
});

export const store = {
  ...appStore,
  sagaTask: sagaMiddleware.run(rootSaga),
};