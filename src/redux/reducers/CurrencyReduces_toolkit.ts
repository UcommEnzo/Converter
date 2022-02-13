import { getCurrencies, getRatioBase, getSearchResult } from './ActionCreators';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { currenciesType, RatioBaseCurrencyType } from '../../types';

interface InitialStateType {
    currenciesIsLoading: boolean
    currencies: currenciesType | null
    currenciesError: string

    searchResultIsLoading: boolean
    searchResult: number | null
    searchResultError: string

    ratioBaseCurrencyIsLoading: boolean
    ratioBaseCurrency: Array<RatioBaseCurrencyType> | null
    ratioBaseCurrencyError: string
}

const initialState: InitialStateType = {
    currenciesIsLoading: false,
    currencies: null,
    currenciesError: '',

    searchResultIsLoading: false,
    searchResult: null,
    searchResultError: '',

    ratioBaseCurrencyIsLoading: false,
    ratioBaseCurrency: null,
    ratioBaseCurrencyError: '',
}

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {},
  extraReducers: {
    [getCurrencies.pending.type]: (state) => {
      state.currenciesIsLoading = true
    },
    [getCurrencies.fulfilled.type]: (state, action: PayloadAction<currenciesType>) => {
      state.currenciesIsLoading = false
      state.currenciesError = ''
      state.currencies = action.payload
    },
    [getCurrencies.rejected.type]: (state, action: PayloadAction<string>) => {
      state.currenciesIsLoading = false
      state.currenciesError = action.payload
    },

    [getSearchResult.pending.type]: (state) => {
      state.searchResultIsLoading = true
    },
    [getSearchResult.fulfilled.type]: (state, action: PayloadAction<number>) => {
      state.searchResultIsLoading = false
      state.searchResultError = ''
      state.searchResult = action.payload
    },
    [getSearchResult.rejected.type]: (state, action: PayloadAction<string>) => {
      state.searchResultIsLoading = false
      state.searchResultError = action.payload
    },

    [getRatioBase.pending.type]: (state) => {
      state.ratioBaseCurrencyIsLoading = true
    },
    [getRatioBase.fulfilled.type]: (state, action: PayloadAction<Array<RatioBaseCurrencyType>>) => {
      state.ratioBaseCurrencyIsLoading = false
      state.ratioBaseCurrencyError = ''
      state.ratioBaseCurrency = action.payload
    },
    [getRatioBase.rejected.type]: (state, action: PayloadAction<string>) => {
      state.ratioBaseCurrencyIsLoading = false
      state.ratioBaseCurrencyError = action.payload
    },
  }
})

export default currencySlice.reducer