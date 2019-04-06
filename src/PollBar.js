import React from "react";
import useBar from "./useBar";
import { PollContext } from "./context";

export default function PollBar({ contestant }) {
  const { state } = React.useContext(PollContext);
  const { vote, percentage, ui } = useBar(contestant);
  return (
    <div className="bar-container" data-testid="pollbar">
      <button
        className="bar-button"
        style={!state.theChosenOne ? { display: "block" } : { display: "none" }}
        onClick={vote}
      >
        {contestant.label}
      </button>

      <div
        data-testid="bar-percentage"
        className="bar-open"
        style={state.theChosenOne ? { display: "block" } : { display: "none" }}
        onClick={() => state.playAround && vote()}
      >
        <span className="bar-label">
          {contestant.label}
          {state.theChosenOne === contestant.value && (
            <span className="bar-checkmark" />
          )}
        </span>
        <span className="floatRight">{percentage}%</span>
        <div
          className={ui().borderRightRadius()}
          style={{ width: ui().addMoreWidth() }}
        />
      </div>
    </div>
  );
}
