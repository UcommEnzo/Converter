import * as React from "react";
import {useEffect, useState} from "react";
import { Table } from 'antd';
import { Select } from 'antd';
import './currencyTab.css';
import { useCustomDispatch, useCustomSelector } from "../hooks/redux";
import { getRatioBase, getCurrencies } from "../redux/reducers/ActionCreators";


const CurrencyTab=({  }) => {
  
  const dispatch = useCustomDispatch()
  const { 
    currencies, currenciesIsLoading, currenciesError,
    ratioBaseCurrencyIsLoading, ratioBaseCurrency, ratioBaseCurrencyError, 
  } = useCustomSelector(state => state.currencyReducer)
  const [baseCurrency, setBaseCurrency] = useState('')
  const Option = Select.Option
  const convertToArray = () => {
    const currenciesKeys = currencies && Object.keys(currencies)
    const currenciesValues = currencies && Object.values(currencies)
    return currenciesKeys && currenciesKeys.map((curr, idx)=> {
      return {code: curr, name: currenciesValues && currenciesValues[idx]}
    })
  }
  const needShowTable = baseCurrency && ratioBaseCurrency && ratioBaseCurrency.length > 0 && !ratioBaseCurrencyError
  const currencyArray = convertToArray()
  const onChangeBaseCurr = (value: string) => {
    setBaseCurrency(value)
  }

  useEffect( () => {
    !currencies && dispatch(getCurrencies())
  },[])

  useEffect(() => {
    baseCurrency && dispatch(getRatioBase(baseCurrency))
  },[baseCurrency])

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Ratio',
      dataIndex: 'ratio',
    },
  ]

  return (
    <div className="tableWrapper">
      <div className="antSelect">
        <Select
          size={"large"}
          style={{minWidth: '200px'}}
          showSearch
          placeholder="Select a currency"
          onChange={onChangeBaseCurr}
        >
          {currencyArray?.map(curr => {
            return <Option value={curr.code} key={curr.code}>{curr.name}</Option>
          })}
        </Select>
      </div>
      {
        ratioBaseCurrencyIsLoading 
          ? <div>Loading...</div>
          : needShowTable 
            ? <Table columns={columns} dataSource={ratioBaseCurrency} size="large"/>
            : ratioBaseCurrencyError
              ? <div>ratioBaseCurrencyError</div>
              : <></>
      }
    </div>
  )
}

export default CurrencyTab