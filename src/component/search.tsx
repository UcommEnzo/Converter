import * as React from "react";
import {useEffect, useState} from "react";
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useCustomDispatch, useCustomSelector } from "../hooks/redux";
import {getCurrencies, getSearchResult} from '../redux/reducers/ActionCreators'


const SearchPage = ({}) => {
  const dispatch = useCustomDispatch()
  const { 
    currencies, currenciesIsLoading, currenciesError,
    searchResult, searchResultIsLoading, searchResultError 
  } = useCustomSelector(state => state.currencyReducer)
  const [inputText, setInputText] = useState('')
  const [amount, setAmount] = useState(0)
  const [firstCurrency, setFirstCurrency] = useState('')
  const [secondCurrency, setSecondCurrency] = useState('')
  const [warnMessage, setWarnMessage] = useState('')

  const onSearchClick = () => {
    const currenciesKeys = currencies && Object.keys(currencies)
    const searchArray = inputText.split(' ')
      .filter(elem => +elem > 0 || currenciesKeys && currenciesKeys.includes(elem))
    const amountIsFirst = +searchArray[0] * 0 === 0

    if (searchArray.length === 3 && amountIsFirst) {
      setAmount(+searchArray[0])
      setFirstCurrency(searchArray[1])
      setSecondCurrency(searchArray[2])
    } else {
      setWarnMessage('Неверно введены данные')
    }
  }

  const clearState = () => {
    amount && setAmount(0)
    firstCurrency && setFirstCurrency('')
    secondCurrency && setSecondCurrency('')
    warnMessage && setWarnMessage('')
  }

  const onInputTextChange = (e) => {
    clearState()
    setInputText(e.target.value)
  }

  useEffect( () => {
    if (amount && firstCurrency && secondCurrency) {
      const payload = {
        amount,
        firstCurrency,
        secondCurrency
      }
      dispatch(getSearchResult(payload))
    }
  },[amount, firstCurrency, secondCurrency])

  useEffect( () => {
    dispatch(getCurrencies())
  },[])

  return (
    <>
      <div className="InputContainer">
        <Input className="InputCurrency"
               placeholder="15 usd in rub"
               onChange={onInputTextChange}
               value={inputText}
        />
      </div>
      <div className="Result">
      {
        warnMessage 
        ? warnMessage
        : searchResultIsLoading
          ? 'Loading...'
          : searchResultError
            ? searchResultError
            : searchResult
      }
      </div>
      <Button icon={<SearchOutlined />} onClick={onSearchClick}>Search</Button>
    </>
  )
}

export default SearchPage