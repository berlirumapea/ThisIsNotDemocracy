import React from "react";
import "./styles.css";
import PollProvider from "./context";
import PollContainer from "./PollContainer";

export default function ThisIsNotDemocracy({ data }) {
  return (
    <PollProvider data={data}>
      <PollContainer />
    </PollProvider>
  );
}
