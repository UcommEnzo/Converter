const express = require('express')
const axios = require('axios')

const app = express()
const PORT = 3001
const baseUrl = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies'

//проверка на случай если не пришёл ключ или значение какой либо валюты
function checkForEmptyData(currencies) {
  let tempCurrencies = Object.entries(currencies)
  tempCurrencies.forEach((curr, idx) => {
    if (curr.length < 2) {
      tempCurrencies.splice( idx, 1)
    }
  })
  tempCurrencies = Object.fromEntries(tempCurrencies)
  return tempCurrencies
}

app.get('/currencies', async (req, res) => {
  try {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.set('Access-Control-Allow-Credentials', 'true')
    let currencies = (await axios.get(`${baseUrl}.json`)).data
    currencies = checkForEmptyData(currencies)
    res.status(200).send(currencies)
  } catch (e) {
    console.log(e)
    res.status(404).send('Не удалось получить данные о валюте')
  }})

app.get('/ratioToBaseCurrency', async (req, res) => {
  try {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.set('Access-Control-Allow-Credentials', 'true')
    const baseCurrency = req.query.base
    let currencies = (await axios.get(`${baseUrl}.json`)).data
    currencies = checkForEmptyData(currencies)
    const currenciesKeys = Object.keys(currencies)
    const currenciesValues = Object.values(currencies)

    const ratioToBaseCurrencyPromises = currenciesKeys.map((curr, idx)=> {
        return axios.get(`${baseUrl}/${curr}/${baseCurrency}.json`)
      }
    )
    const promiseData = await Promise.all(ratioToBaseCurrencyPromises)
    const ratio = promiseData.map(ratio => ratio.data)

    const ratioToBaseCurrency = currenciesKeys.map((curr, idx)=> {
      return {key: idx+1 ,code: curr, name: currenciesValues[idx], ratio: ratio[idx]?.[baseCurrency]}
    })

    res.status(200).send(ratioToBaseCurrency)
  } catch (e) {
    console.log(e)
    res.status(404).send(`Не удалось получить данные для базовой валюты ${req.query.base}`)
  }})

app.get('/getSearchCurrencyRatio', async (req, res) => {
  try {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.set('Access-Control-Allow-Credentials', 'true')
    const { amount } = req.query
    const { firstCurrency } = req.query
    const { secondCurrency } = req.query
    const ratio = (await axios.get(`${baseUrl}/${firstCurrency}/${secondCurrency}.json`)).data[secondCurrency]
    const result = amount * ratio
    res.status(200).send({result})
  } catch (e) {
    console.log(e.message)
    res.status(404).send(`Не удалось получить данные о валюте`)
  }})

app.listen(PORT, () => {
  console.log('Money, Money, Money')
})