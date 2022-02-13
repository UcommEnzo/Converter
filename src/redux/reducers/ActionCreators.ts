import { searchResultPayloadType, RatioBaseCurrencyType } from './../../types/index';
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const baseUrl = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies'

export const getCurrencies = createAsyncThunk(
  'currency/getCurrency',
  async (_, thunkAPI) => {
    try {
      const currencies = await axios.get(`${baseUrl}.json`)
      return currencies.data
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)

export const getSearchResult = createAsyncThunk(
  'currency/getSearchResult',
  async (payload: searchResultPayloadType, thunkAPI) => {
    try {
      const {amount, firstCurrency, secondCurrency} = payload
      const ratio = (await axios.get(`${baseUrl}/${firstCurrency}/${secondCurrency}.json`)).data[secondCurrency]
      const result: number = +(amount * ratio).toFixed(2)
      return result
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)

export const getRatioBase = createAsyncThunk(
  'currency/getRatioBase',
  async (payload: string, thunkAPI) => {
    try {
      const baseCurrency = payload
      const currencies = (await axios.get(`${baseUrl}.json`)).data
      const currenciesKeys: Array<string> = Object.keys(currencies)
      const currenciesValues: Array<string> = Object.values(currencies)
      const ratioToBaseCurrencyPromises = currenciesKeys.map((curr, idx)=> {
          return axios.get(`${baseUrl}/${curr}/${baseCurrency}.json`)
        }
      )
      const promiseData = await Promise.all(ratioToBaseCurrencyPromises)
      const ratio = promiseData.map(ratio => ratio.data)
      const ratioToBaseCurrency: Array<RatioBaseCurrencyType> = currenciesKeys.map((curr, idx) => {
        return {key: idx+1, code: curr, name: currenciesValues[idx], ratio: ratio[idx]?.[baseCurrency]}
      })
      return ratioToBaseCurrency

    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)