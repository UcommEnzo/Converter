import {getCurrencies, getSearchResult, getRatioBase} from "./index";
const axios = require('axios')

jest.mock('axios')

describe('Rest request:', () => {
  let responce
  let curr
  let searchResult
  let ratioToBaseCurr
  let amount
  let firstCurrency
  let secondCurrency
  let base
  let usdToRubRatio

  beforeEach(() => {
    curr = {
      rub: 'Russian ruble',
      usd: "United States dollar",
      eur: "Euro"
    }
    searchResult = {
      result: amount * usdToRubRatio
    }
    ratioToBaseCurr = [
      {key: 1, code: 'usd', name: 'United States dollar', ratio: 75},
      {key: 2, code: 'eur', name: 'Euro', ratio: 85},
      {key: 3, code: 'rub', name: 'Russian ruble', ratio: 1}
    ]
    amount = 10
    firstCurrency = 'usd'
    secondCurrency = 'rub'
    base = 'rub'
    usdToRubRatio = 75
    responce = {
      data: {
        curr,
        searchResult,
        ratioToBaseCurr
      }
    }
  })

  test('getCurrencies should return correct object witch all currencies ', () => {
    axios.get.mockReturnValue(responce)

    return getCurrencies().then(data => {
        expect(data.curr).toEqual(curr)
      }
    )
  })

  test('getSearchResult should return correct value ', () => {
    axios.get.mockReturnValue(responce)

    return getSearchResult( amount, firstCurrency, secondCurrency).then(data => {
        expect(data.searchResult).toEqual(searchResult)
      }
    )
  })

  test('getRatioBase should return the correct ratio of the base currency to other currencies ', () => {
    axios.get.mockReturnValue(responce)

    return getRatioBase(base).then(data => {
        expect(data.ratioToBaseCurr).toEqual(ratioToBaseCurr)
      }
    )
  })
})
