import { RootState } from '@store/rootReducer';

export interface Process<T> {
    getState: () => RootState;
    action: T;
}
