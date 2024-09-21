import { useState } from "react";
import InputBox from "./Components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState("");

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo || {});

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convert = () => {
    if (amount && !isNaN(amount) && currencyInfo && currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to]);
    } else {
      setConvertedAmount("");
    }
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-gradient-to-b from-gray-800 to-black"
      style={{ height: "100vh" }}
    >
      <div className="w-full max-w-md mx-auto p-6">
        <div className="border border-gray-600 rounded-lg p-6 shadow-lg bg-gray-900">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-4">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(value) => setAmount(value)}
              />
            </div>
            <div className="flex justify-center my-4">
              <button
                type="button"
                className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white bg-black text-white font-bold transition-transform transform hover:bg-gray-800 hover:scale-110"
                onClick={swap}
                aria-label="Swap currencies"
              >
                <span className="text-lg">⇄</span>
              </button>
            </div>
            <div className="w-full mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 rounded-lg transition-colors shadow-lg text-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
