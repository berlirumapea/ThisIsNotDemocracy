import React from "react";
import { PollContext } from "./context";
import useTimeDuration from "./useTimeDuration";
import PollBar from "./PollBar";

export default function PollContainer() {
  const { state } = React.useContext(PollContext);
  const timesLeft = useTimeDuration(state.until);
  return (
    <div className="poll-container">
      <h4 className="poll-question" tabIndex="0">
        {state.question}
      </h4>

      {state.contestants &&
        state.contestants.map(contestant => (
          <PollBar key={contestant.value} contestant={contestant} />
        ))}

      <div className="poll-description">
        <span tabIndex="0" data-testid="poll-description">
          {state.totalVotes || 0} votes
          {state.until && <span> • {timesLeft} left</span>}
        </span>
      </div>
    </div>
  );
}
