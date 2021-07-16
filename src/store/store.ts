import { createLogicMiddleware } from 'redux-logic';
import logics from '../logics';
import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const logicMiddleware = createLogicMiddleware(logics);

export const Store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(logicMiddleware)),
);
