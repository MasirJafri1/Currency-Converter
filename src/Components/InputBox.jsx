import React, { useId } from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisable = false,
  currencyDisable = false,
  className = "",
}) {
  const amountInputId = useId();

  return (
    <div className={`p-3 rounded-lg text-sm flex ${className}`}>
      <div className="w-1/2">
        <label
          htmlFor={amountInputId}
          className="text-gray-300 mb-2 inline-block text-lg font-bold"
        >
          {label}
        </label>
        <input
          id={amountInputId}
          className="outline-none w-full bg-gray-700 text-white py-2 px-3 rounded-lg text-lg font-bold"
          type="number"
          placeholder="Amount"
          disabled={amountDisable}
          value={amount || ""}
          onChange={(e) => {
            const value = e.target.value;
            onAmountChange && onAmountChange(value === "" ? "" : Number(value));
          }}
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-gray-300 mb-2 w-full text-lg font-bold">
          Currency Type
        </p>
        <select
          className="rounded-lg px-2 py-2 bg-gray-600 text-white cursor-pointer outline-none text-lg font-bold"
          value={selectCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisable}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency} className="uppercase">
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
