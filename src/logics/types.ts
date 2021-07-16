import { RootState } from 'caStore/rootReducer';

export interface Process<T> {
    getState: () => RootState;
    action: T;
}
