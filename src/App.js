import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import './App.css';
import SearchPage from "./component/search";
import CurrencyTab from "./component/currencyTab";

const App = (props) => {
  const {
    getAllCurrencies,
    currencies,
    getResult,
    searchResult,
    ratioToBaseCurr,
    getRatioToBase
  } = props

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
