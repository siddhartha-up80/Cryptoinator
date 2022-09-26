import "./App.css";
import Header from "./components/Header";
import EnhancedTable from "./components/EnhancedTable";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import About from "./components/About";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [searchCoin, setSearchCoin] = useState("");
  const [coinInfo, setCoinInfo] = useState([]);

  useEffect(() => {
    Axios.get(
      "https://api.coinstats.app/public/v1/coins?skip=0&limit=100&currency=INR"
    ).then((response) => {
      setCoinInfo(response.data.coins);
    });
  }, []);

  const filteredCoins = coinInfo.filter((coin) => {
    return coin.name.toLowerCase().includes(searchCoin.toLowerCase());
  });

  return (
    <Router>
      <Header setSearchCoin={setSearchCoin} />
      <Routes>
        <Route
          path="/"
          element={<EnhancedTable coinInfo={filteredCoins} />}
        ></Route>

        <Route path="about" element={<About />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
