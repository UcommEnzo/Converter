import axios from "axios";

const baseUrl = 'http://localhost:3001/'

export const getCurrencies = async () => {
  try {
    return (await axios.get(`${baseUrl}currencies`)).data
  } catch (e) {
    console.log(e)
  }
}

export const getSearchResult = async (payload) => {
  try {
    const {
      amount,
      firstCurrency,
      secondCurrency
    } = payload
    return (await axios.get(`${baseUrl}getSearchCurrencyRatio?amount=${amount}&firstCurrency=${firstCurrency}&secondCurrency=${secondCurrency}`)).data
  } catch (e) {
    console.log(e)
  }
}

export const getRatioBase = async (payload) => {
  try {
    const base = payload
    return (await axios.get(`${baseUrl}ratioToBaseCurrency?base=${base}`)).data
  } catch (e) {
    console.log(e)
  }
}