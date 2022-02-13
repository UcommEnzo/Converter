import { DispatchType, RootReducerType } from './../redux/store_toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


export const useCustomDispatch = () => useDispatch<DispatchType>()
export const useCustomSelector: TypedUseSelectorHook<RootReducerType> = useSelector