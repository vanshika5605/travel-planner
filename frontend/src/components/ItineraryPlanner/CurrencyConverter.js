import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./CurrencyConverter.css";

const CurrencyConverter = ({currencies, rates}) => {
  const [fromCurrency, setFromCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  // Convert the amount
  const convertCurrency = () => {
    if (fromCurrency && toCurrency && rates[fromCurrency.value] && rates[toCurrency.value]) {
      const rate = rates[toCurrency.value] / rates[fromCurrency.value];
      setConvertedAmount((amount * rate).toFixed(2));
    }
  };

  // Swap the currencies
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  useEffect(() => {
    setFromCurrency(currencies.find((c) => c.value === "USD"));
    setToCurrency(currencies.find((c) => c.value === "EUR"));
  }, []);

  useEffect(() => {
    convertCurrency();
  }, [fromCurrency, toCurrency, amount]);

  return (
    <div className="currency-converter">
      <div className="converter-header">
        <h2>Currency Converter</h2>
      </div>
      <div className="converter-body">
        {/* From Section */}
        <div className="currency-section">
          <input
            type="number"
            className="amount-input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
          />
          <Select
            options={currencies}
            value={fromCurrency}
            onChange={(selected) => setFromCurrency(selected)}
            className="currency-select"
          />
        </div>

        {/* Swap Button */}
        <button className="swap-button" onClick={handleSwap}>
          ⇄
        </button>

        {/* To Section */}
        <div className="currency-section">
          <input
            type="text"
            className="amount-input"
            value={convertedAmount || ""}
            placeholder="Converted Amount"
            readOnly
          />
          <Select
            options={currencies}
            value={toCurrency}
            onChange={(selected) => setToCurrency(selected)}
            className="currency-select"
          />
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
