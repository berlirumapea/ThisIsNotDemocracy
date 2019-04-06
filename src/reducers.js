export const calculateTotalVotes = contestants =>
  contestants.reduce((prev, curr) => {
    let votes = curr.votes || 0;
    return prev + votes;
  }, 0);

const reducers = (state, action) => {
  switch (action.type) {
    case "VOTE":
      let pilihan = action.payload;

      // find the chosen one and increase its total picks
      const contestants = state.contestants.map(contestant => {
        let totalVotedPrev = contestant.votes ? contestant.votes : 0;
        if (contestant.value === pilihan.value) {
          return { ...contestant, votes: totalVotedPrev + 1, voted: true };
        }
        // else return the original and a new addition property
        return { ...contestant, votes: totalVotedPrev };
      });

      // find voted choice
      const theChosenOne = state.contestants.find(
        contestant => contestant.value === pilihan.value
      ).value;

      // get total votes

      return {
        ...state,
        contestants,
        theChosenOne,
        totalVotes: calculateTotalVotes(contestants)
      };
    default:
      return state;
  }
};

export default reducers;
