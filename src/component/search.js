import React, {useEffect, useState} from "react";
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';


const SearchPage = ({getAllCurrencies, getResult, currencies, searchResult}) => {
  const [inputText, setInputText] = useState('')
  const [amount, setAmount] = useState(0)
  const [firstCurrency, setFirstCurrency] = useState('')
  const [secondCurrency, setSecondCurrency] = useState('')
  const [warnMessage, setWarnMessage] = useState('')

  const onSearchClick = () => {
    const currenciesKeys = Object.keys(currencies)
    let searchArray = inputText.split(' ')
      .filter((elem, idx) => +elem > 0 || currenciesKeys.includes(elem))
    if (searchArray.length === 3) {
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
      getResult(payload)
    }
  },[amount, firstCurrency, secondCurrency])

  useEffect( () => {
    getAllCurrencies()
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
      <div className="Result">{warnMessage ? warnMessage : searchResult?.toFixed(2)}</div>
      <Button icon={<SearchOutlined />} onClick={onSearchClick}>Search</Button>
    </>
  )
}

export default SearchPage