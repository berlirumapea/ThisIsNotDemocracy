import React from "react";
import reducers from "./reducers";

export const PollContext = React.createContext({});
export const PollConsumer = PollContext.Consumer;

function PollProvider(props) {
  const [state, dispatch] = React.useReducer(reducers, { ...props.data });

  return (
    <PollContext.Provider value={{ state, dispatch }}>
      {props.children}
    </PollContext.Provider>
  );
}
export default PollProvider;
