"use client";

import React, {
  createContext,
  useContext,
  useReducer,
} from "react";

import type { Todo } from "@/ts/schema.t";

type State = {
  todos: Todo[]
  isCreateDrawerOpen: boolean
}

type Action =
  | { type: 'TOGGLE_TODO', payload: string }
  | { type: 'OPEN_CREATE_DRAWER' }
  | { type: 'CLOSE_CREATE_DRAWER' }
  | { type: 'CREATE_TODO', payload: Todo }

type Dispatch = React.Dispatch<Action>

type PreloadedState = Pick<State, 'todos'>

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((_todo) => _todo.id === action.payload
          ? { ..._todo, is_done: _todo.is_done === 0 ? 1 : 0 }
          : _todo
        )
      }
    case "OPEN_CREATE_DRAWER":
      return {
        ...state,
        isCreateDrawerOpen: true,
      }
    case "CLOSE_CREATE_DRAWER":
      return {
        ...state,
        isCreateDrawerOpen: false,
      }
    case "CREATE_TODO":
      return {
        ...state,
        todos: state.todos.concat(action.payload),
      }
    default:
      return state;
  }
}

const ServiceStateContext = createContext<State | null>(null);
const ServiceDispatchContext = createContext<Dispatch | null>(null);

export const useServiceState = () => {
  const context = useContext(ServiceStateContext);
  if (!context) throw new Error("Cannot find <ServiceProvider />");
  return context;
}

export const useServiceDispatch = () => {
  const context = useContext(ServiceDispatchContext);
  if (!context) throw new Error("Cannot find <ServiceProvider />");
  return context;
}

export const ServiceProvider = ({
                                  preloadedState,
                                  children,
                                }: {
  preloadedState: PreloadedState
  children: React.ReactNode
}) => {
  const [state, dispatch] = useReducer(reducer, {
    todos: preloadedState.todos,
    isCreateDrawerOpen: false,
  });

  return (
    <ServiceStateContext.Provider value={state}>
      <ServiceDispatchContext.Provider value={dispatch}>
        {children}
      </ServiceDispatchContext.Provider>
    </ServiceStateContext.Provider>
  )
}
