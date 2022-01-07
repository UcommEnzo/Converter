import React from 'react'
import {connect} from "react-redux";
import App from "./App";
import {getCurrencies, getRatioBase, getSearchResult} from "./redux/reducers/CurrencyReduces";

const mapStateToProps = (state) => {
  return {
    currencies: state.currencies.currencies,
    searchResult: state.currencies.searchResult,
    ratioToBaseCurr: state.currencies.ratioBaseCurrency,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCurrencies: () => dispatch(getCurrencies()),
    getResult: (payload) => dispatch(getSearchResult(payload)),
    getRatioToBase: (payload) => dispatch(getRatioBase(payload))
  }
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppContainer