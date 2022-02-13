import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import './App.css';
import SearchPage from "./component/search.tsx";
import CurrencyTab from "./component/currencyTab.tsx";


const App = () => {

  return (
    <Router>
      <div className="App">
        <div className="LinkWrapper">
          <Link to="/"> Search</Link>
          <Link to="/currencytab">Currency Tab</Link>
        </div>
        <Routes>
          <Route exact path="/" element={
            <SearchPage/>
          }/>

          <Route path="/currencytab" element={
            <CurrencyTab/>
          }/>
        </Routes>
      </div>
    </Router>
  )
}

export default App;
