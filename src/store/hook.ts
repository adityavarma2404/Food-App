import { useDispatch, useSelector ,type TypedUseSelectorHook } from "react-redux";
import { AppDispatch, Rootstate } from "./store";

type DispatchFunction = () => AppDispatch

export const useCartDispatch: DispatchFunction = useDispatch;
export const useCartSelector: TypedUseSelectorHook<Rootstate> = useSelector;