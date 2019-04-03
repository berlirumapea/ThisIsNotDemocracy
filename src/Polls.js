import React from "react";
import PollBar from "./PollBar";

const Polls = ({ data, playAround }) => {
  const { pollsData, vote } = usePollsData(data);

  return (
    <div className="poll-container">
      <h4 className="poll-question" tabIndex="0">
        {pollsData.question}
      </h4>
      {pollsData &&
        pollsData.contestants.map(contestant => (
          <PollBar
            key={contestant.value}
            data={contestant}
            onClick={vote}
            isPicked={pollsData.isPicked || false}
            totalVotes={pollsData.totalVotes || 0}
            playAround={playAround}
            contestantPicked={pollsData.contestantPicked}
          />
        ))}

      <div className="poll-description">
        <span tabIndex="0">
          {pollsData.totalVotes || 0} votes
          {pollsData.until && <span> • {pollsData.until.toString()}</span>}
        </span>
      </div>
    </div>
  );
};

export const calculateTotalVotes = contestants =>
  contestants.reduce((prev, curr) => {
    let picks = curr.picks || 0;
    return prev + picks;
  }, 0);

function usePollsData(polls) {
  const [pollsData, setPollsData] = React.useState(polls);

  // calculate totalVotes everytime pollsData data changes
  React.useEffect(
    () => {
      // get total votes here
      const totalVotes = calculateTotalVotes(pollsData.contestants);
      setPollsData({ ...pollsData, totalVotes });
    },
    [pollsData]
  );

  const vote = pilihan => {
    // find the chosen one and increase its total picks
    const updatedContestantsData = pollsData.contestants.map(c => {
      let totalPickedPrev = c.picks ? c.picks : 0;
      if (c.value === pilihan.value) {
        return { ...c, picks: totalPickedPrev + 1 };
      }

      // else return the original and a new addition property
      return { ...c, picks: totalPickedPrev };
    });

    // find the chosen one in contestans array
    const theChosenOne = pollsData.contestants.find(
      c => c.value === pilihan.value
    );

    // set a new value to pollsData in statae
    setPollsData({
      ...pollsData,
      contestants: updatedContestantsData,
      isPicked: true,
      contestantPicked: theChosenOne.value
    });
  };

  return { pollsData, vote };
}

export default Polls;
