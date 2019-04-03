import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import Polls from "./Polls";

const polls = {
  question:
    "Siapakah Presiden yang akan memimpin Indonesia di periode selanjutnya?",
  contestants: [
    {
      label: "Jokowi - Ma'ruf",
      value: "jm"
    },
    {
      label: "Prabowo - Sandi",
      value: "ps"
    },
    {
      label: "Nurhadi - Aldo",
      value: "na"
    }
  ],
  until: "1 hour left"
};

function App() {
  return (
    <div className="App">
      <Polls data={polls} playAround={true} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
