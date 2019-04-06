import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import ThisIsNotDemocracy from "./ThisIsNotDemocracy";

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
  until: moment(new Date()).add(2, "hours"),
  playAround: true
};

function App() {
  return (
    <div className="App">
      <ThisIsNotDemocracy data={polls} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
