import {applyMiddleware, combineReducers, createStore} from "redux"
import createSagaMiddleware from 'redux-saga'
import currencyReducer from "./reducers/CurrencyReduces"
import {watcherCurrencies} from "./saga";

let reducers = combineReducers({
    currencies: currencyReducer
})

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducers, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(watcherCurrencies)

export default store