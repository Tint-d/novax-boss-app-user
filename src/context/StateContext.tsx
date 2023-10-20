import { createContext, useContext, useReducer, useState } from "react";
import {
  ActionType,
  ChildrenType,
  InitialStateType,
  StateContextType,
} from "../typings/type";

const initialState: InitialStateType = {
  textToggle: false,
  textToggle2: false,
};

const reducer = (state: InitialStateType, action: ActionType) => {
  const { type } = action;
  switch (type) {
    case "TOGGLE_PASSWORD":
      return { ...state, textToggle: !state.textToggle };
    case "TOGGLE_PASSWORD_CONFIRMATION":
      return { ...state, textToggle2: !state.textToggle2 };
    default:
      return state;
  }
};

const StateContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => {} });

export const StateContextProvider = ({ children }: ChildrenType) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
