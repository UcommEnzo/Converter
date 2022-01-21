export const GET_CURRENCIES = 'currency/GET_CURRENCIES'
export const GET_SEARCH_RESULT = 'currency/GET_SEARCH_RESULT'
export const GET_RATIO_BASE_CURRENCY = 'currency/GET_RATIO_BASE_CURRENCY'
export const SET_CURRENCIES = 'currency/SET_CURRENCIES'
export const SET_SEARCH_RESULT = 'currency/SET_USER_DATA'
export const SET_RATIO_BASE_CURRENCY = 'currency/SET_RATIO_BASE_CURRENCY'

type ratioBaseCurrencyType = {
    code: string
    key: number
    name: string
    ratio: number
}
type initialStateType = {
    currencies: Object | null,
    searchResult: number | null,
    ratioBaseCurrency: Array<ratioBaseCurrencyType> | null
}

type getCurrenciesType = {type: typeof GET_CURRENCIES}
type setCurrenciesType = {type: typeof SET_CURRENCIES, payload: initialStateType['currencies']}
type payloadArgSearchResultType = {
    amount: number
    firstCurrency: string
    secondCurrency: string
}
type getSearchResultType = {type: typeof GET_SEARCH_RESULT, payload: payloadArgSearchResultType}
type setSearchResultType = {type: typeof SET_SEARCH_RESULT, payload: initialStateType['searchResult']}
type getRatioBaseType = {type: typeof GET_RATIO_BASE_CURRENCY, payload: string}
type setRatioBaseType = {type: typeof SET_RATIO_BASE_CURRENCY, payload: initialStateType['ratioBaseCurrency']}


let initialState: initialStateType = {
    currencies: null,
    searchResult: null,
    ratioBaseCurrency: null
}

const currencyReducer = (state = initialState, action): initialStateType => {
    switch (action.type) {
        case SET_CURRENCIES:
            return {...state, currencies: action.payload}
        case SET_SEARCH_RESULT:
            return {...state, searchResult: action.payload.result}
        case SET_RATIO_BASE_CURRENCY:
            return {...state, ratioBaseCurrency: action.payload}
        default:
            return state
    }
}

export const getCurrencies = (): getCurrenciesType => ({type: GET_CURRENCIES})
export const setCurrencies = (payload: initialStateType['currencies']): setCurrenciesType => ({type: SET_CURRENCIES, payload})
export const getSearchResult = (payload: payloadArgSearchResultType): getSearchResultType => ({type: GET_SEARCH_RESULT, payload})
export const setSearchResult = (payload: initialStateType['searchResult']): setSearchResultType => ({type: SET_SEARCH_RESULT, payload})
export const getRatioBase = (payload: string): getRatioBaseType => ({type: GET_RATIO_BASE_CURRENCY, payload})
export const setRatioBase = (payload: initialStateType['ratioBaseCurrency']): setRatioBaseType => ({type: SET_RATIO_BASE_CURRENCY, payload})

export default currencyReducer