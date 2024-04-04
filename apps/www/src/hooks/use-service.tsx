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
  isEditDrawerOpen: boolean
  selectedEditTodo: Todo | null
}

type Action =
  | { type: 'TOGGLE_TODO', payload: string }
  | { type: 'OPEN_CREATE_DRAWER' }
  | { type: 'CLOSE_CREATE_DRAWER' }
  | { type: 'OPEN_EDIT_DRAWER', payload: Todo }
  | { type: 'CLOSE_EDIT_DRAWER' }
  | { type: 'CREATE_TODO', payload: Todo }
  | { type: 'EDIT_TODO', payload: Todo }
  | { type: 'DELETE_TODO', payload: string }

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
    case "OPEN_EDIT_DRAWER":
      return {
        ...state,
        isEditDrawerOpen: true,
        selectedEditTodo: action.payload,
      }
    case "CLOSE_EDIT_DRAWER":
      return {
        ...state,
        isEditDrawerOpen: false,
        selectedEditTodo: null,
      }
    case "CREATE_TODO":
      return {
        ...state,
        todos: state.todos.concat(action.payload),
      }
    case "EDIT_TODO":
      return {
        ...state,
        todos: state.todos.map((_todo) => _todo.id === action.payload.id
          ? action.payload
          : _todo
        )
      }
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((_todo) => _todo.id !== action.payload),
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
    isEditDrawerOpen: false,
    selectedEditTodo: null,
  });

  return (
    <ServiceStateContext.Provider value={state}>
      <ServiceDispatchContext.Provider value={dispatch}>
        {children}
      </ServiceDispatchContext.Provider>
    </ServiceStateContext.Provider>
  )
}
