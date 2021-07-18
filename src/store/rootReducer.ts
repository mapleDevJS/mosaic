import { combineReducers } from 'redux';
import { studentsReducer } from '@ducks/students';

export const rootReducer = combineReducers({
    data: studentsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
