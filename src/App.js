import React, {useCallback} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import './App.css';
import SearchPage from "./component/search";
import CurrencyTab from "./component/currencyTab";
import {getCurrencies, getSearchResult, getRatioBase} from "../src/redux/reducers/CurrencyReduces";



const App = () => {

  const dispatch = useDispatch()
  const currencies = useSelector((state) => state.currencies.currencies)
  const searchResult = useSelector((state) => state.currencies.searchResult)
  const ratioToBaseCurr = useSelector((state) => state.currencies.ratioBaseCurrency)

  const getAllCurrencies = useCallback(
    () => dispatch(getCurrencies()),
    [dispatch]
  )
  const getResult = useCallback(
    (payload) => dispatch(getSearchResult(payload)),
    [dispatch]
  )
  const getRatioToBase = useCallback(
    (payload) => dispatch(getRatioBase(payload)),
    [dispatch]
  )

  return (
    <Router>
      <div className="App">
        <div className="LinkWrapper">
          <Link to="/"> Search</Link>
          <Link to="/currencytab">Currency Tab</Link>
        </div>
        <Routes>
          <Route exact path="/" element={
            <SearchPage getAllCurrencies={getAllCurrencies} currencies={currencies}
                        getResult={getResult} searchResult={searchResult}
            />
          }/>

          <Route path="/currencytab" element={
            <CurrencyTab currencies={currencies} ratioToBaseCurr={ratioToBaseCurr}
                         getRatioToBase={getRatioToBase}
            />
          }/>
        </Routes>
      </div>
    </Router>
  )
}

export default App;
