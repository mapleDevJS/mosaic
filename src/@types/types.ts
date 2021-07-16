import { Action, AnyAction } from 'redux';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActionCreator = (...args: any[]) => AnyAction;

/**
 * Type of one action creator
 */
export type ActionType<TActionCreator extends ActionCreator> =
    ReturnType<TActionCreator>;

/**
 * Union type of all action creators (action creators provided as object)
 * Example type AllActionsType = ActionTypes<typeof actions>;
 */
export type ActionTypes<ActionCreators> = ActionCreators extends ActionCreator
    ? ReturnType<ActionCreators>
    : {
          [K in keyof ActionCreators]: ActionTypes<ActionCreators[K]>;
      }[keyof ActionCreators];

export type LogicAction<
    Type = never,
    Payload = never,
    Error = never,
> = Action<Type> &
    ([Payload] extends [never] ? {} : { payload: Payload }) &
    ([Error] extends [never] ? {} : { error: Error });
