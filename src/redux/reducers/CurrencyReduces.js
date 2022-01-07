export const GET_CURRENCIES = 'currency/GET_CURRENCIES'
export const GET_SEARCH_RESULT = 'currency/GET_SEARCH_RESULT'
export const GET_RATIO_BASE_CURRENCY = 'currency/GET_RATIO_BASE_CURRENCY'
export const SET_CURRENCIES = 'currency/SET_CURRENCIES'
export const SET_SEARCH_RESULT = 'currency/SET_USER_DATA'
export const SET_RATIO_BASE_CURRENCY = 'currency/SET_RATIO_BASE_CURRENCY'


let initialState = {
    currencies: [],
    searchResult: null,
    ratioBaseCurrency: []
}

const currencyReducer = (state = initialState, action) => {
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

export const getCurrencies = () => ({type: GET_CURRENCIES})
export const setCurrencies = (payload) => ({type: SET_CURRENCIES, payload})
export const getSearchResult = (payload) => ({type: GET_SEARCH_RESULT, payload})
export const setSearchResult = (payload) => ({type: SET_SEARCH_RESULT, payload})
export const getRatioBase = (payload) => ({type: GET_RATIO_BASE_CURRENCY, payload})
export const setRatioBase = (payload) => ({type: SET_RATIO_BASE_CURRENCY, payload})

export default currencyReducer