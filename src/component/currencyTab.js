import React, {useEffect, useState} from "react";
import { Table } from 'antd';
import { Select } from 'antd';
import './currencyTab.css';


const CurrencyTab=({currencies, ratioToBaseCurr, getRatioToBase}) => {
  const [baseCurrency, setBaseCurrency]=useState('')
  const Option = Select.Option
  const convertToArray = () => {
    const currenciesKeys = Object.keys(currencies)
    const currenciesValues = Object.values(currencies)
    return currenciesKeys.map((curr, idx)=> {
      return {code: curr, name: currenciesValues[idx]}
    })
  }
  const currencyArray = convertToArray()
  const onChangeBaseCurr = (value) => {
    setBaseCurrency(value)
  }
  useEffect(() => {
    if (baseCurrency) getRatioToBase(baseCurrency)
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
          {currencyArray.map(curr => {
            return <Option value={curr.code} key={curr.code}>{curr.name}</Option>
          })}
        </Select>
      </div>
      {ratioToBaseCurr?.length > 0 && <Table columns={columns} dataSource={ratioToBaseCurr} size="large"/>}
    </div>
  )
}

export default CurrencyTab