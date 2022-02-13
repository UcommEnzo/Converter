import { configureStore, combineReducers } from "@reduxjs/toolkit";
import currencyReducer from "./reducers/CurrencyReduces_toolkit"

const rootReducers = combineReducers({
  currencyReducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducers
})}

export type RootReducerType = ReturnType<typeof rootReducers>
export type StoreType = ReturnType<typeof setupStore>
export type DispatchType = StoreType['dispatch']