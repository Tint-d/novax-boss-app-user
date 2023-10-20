import { ReactNode } from "react";

export interface ChildrenType {
  children: ReactNode;
}

export interface FormStateType {
  [key: string]: string;
}

export interface StateContextType {
  textToggle: boolean;
  setTextToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface InitialStateType {
  textToggle: boolean;
  textToggle2: boolean;
}

export enum ChangeAction {
  TogglePassword = "TOGGLE_PASSWORD",
  TogglePasswordConfirmation = "TOGGLE_PASSWORD_CONFIRMATION",
}

export interface ActionType {
  type: ChangeAction;
}
