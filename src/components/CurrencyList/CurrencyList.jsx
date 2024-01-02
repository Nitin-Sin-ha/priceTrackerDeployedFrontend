import axios from "axios";
import React, { useState, useEffect } from "react";
import "./list.css";

const CurrencyList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://cryptopricetracker-410007.uw.r.appspot.com/allCoins")
      .then((response) => {
        setData(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const formatMarketCap = (value) => {
    if (value >= 1e9) {
      return `${(value / 1e9).toFixed(2)}B`;
    } else if (value >= 1e6) {
      return `${(value / 1e6).toFixed(2)}M`;
    } else {
      return value;
    }
  };

  const formatPrice = (value) => {
    return value.toFixed(5);
  };

  return (
    <div>
      <table className="table">
        <tr>
          <th className="items1">Index</th>
          <th className="items1">Name</th>
          <th>Symbol</th>
          <th>Current Price(USD)</th>
          <th>Market Cap(USD)</th>
        </tr>
        {data.map((items, index) => (
          <tr>
            <td className="items1">{index + 1}</td>
            <td className="items1">{items.name}</td>
            <td className="items">{items.symbol}</td>
            <td className="items">{formatPrice(items.currentPrice)}</td>
            <td className="items">{formatMarketCap(items.marketCap)}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default CurrencyList;
