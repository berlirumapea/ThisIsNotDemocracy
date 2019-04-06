import React from "react";
import { PollContext } from "./context";

export default function useBar(contestantData) {
  const { state, dispatch } = React.useContext(PollContext);
  const [percentage, setPercentage] = React.useState(0);

  React.useEffect(() => {
    // get percentage value
    const percent =
      ((contestantData.votes || 0) / (state.totalVotes || 0)) * 100;

    if (isNaN(percent)) {
      setPercentage(0);
    } else {
      setPercentage(Math.round(percent));
    }

    // only execute when these items changed
  }, [contestantData, state.totalVotes]);

  // dispatching an action to our reducer
  function vote() {
    dispatch({ type: "VOTE", payload: contestantData });
  }

  function ui() {
    return {
      addMoreWidth: () => {
        if (percentage < 100 && percentage !== 0) {
          return percentage + 20 + "%";
        }

        // returns string used for css width
        return percentage + "%";
      },
      borderRightRadius: () => {
        let borderRadiusClasses = [
          "bar-open-percentage",
          "bar-open-percentage-not-100"
        ];
        if (percentage === 100) {
          // with border right radius
          return borderRadiusClasses[0];
        }

        // with no border right radius
        return borderRadiusClasses.join(" ");
      }
    };
  }

  return { vote, percentage, ui };
}
