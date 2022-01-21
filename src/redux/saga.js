import {put, takeLatest, call} from "redux-saga/effects";
import {getCurrencies, getSearchResult, getRatioBase} from "../rest-requests";
import {
    GET_CURRENCIES,
    GET_RATIO_BASE_CURRENCY,
    GET_SEARCH_RESULT,
    setCurrencies,
    setRatioBase,
    setSearchResult
} from "./reducers/CurrencyReduces.ts";

function* updateCurrencies() {
    const payload = yield call(getCurrencies)
    yield put(setCurrencies(payload))
}

function* updateSearchResult(action) {
    const payload = yield call(getSearchResult, action.payload)
    yield put(setSearchResult(payload))
}

function* updateRatioBaseCurrency(action) {
    const payload = yield call(getRatioBase, action.payload)
    yield put(setRatioBase(payload))
}

export function* watcherCurrencies() {
    yield takeLatest(GET_CURRENCIES, updateCurrencies)
    yield takeLatest(GET_SEARCH_RESULT, updateSearchResult)
    yield takeLatest(GET_RATIO_BASE_CURRENCY, updateRatioBaseCurrency)
}
