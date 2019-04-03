import React from "react";

const PollBar = ({
  data,
  onClick,
  isPicked,
  totalVotes,
  playAround,
  contestantPicked
}) => {
  const getPercentage = () => {
    const percen = ((data.picks || 0) / (totalVotes || 0)) * 100;
    if (isNaN(percen)) {
      return 0;
    }
    return Math.round(percen);
  };

  const addAdditionalPercentageValueForTheSakeOfUI = () => {
    if (getPercentage() < 100 && getPercentage() !== 0) {
      return getPercentage() + 20 + "%";
    }
    return getPercentage() + "%";
  };

  const barBorderRadiusClasses = () => {
    let borderRadiusClasses = [
      "bar-open-percentage",
      "bar-open-percentage-not-100"
    ];
    if (getPercentage() === 100) {
      return borderRadiusClasses[0];
    }
    return borderRadiusClasses.join(" ");
  };

  return (
    <>
      <button
        className="bar-button"
        onClick={() => onClick(data)}
        style={!isPicked ? { display: "block" } : { display: "none" }}
      >
        {data.label}
      </button>

      <div
        className="bar-open"
        onClick={() => playAround && onClick(data)}
        style={isPicked ? { display: "block" } : { display: "none" }}
      >
        <span className="bar-label">
          {data.label}
          {data.value === contestantPicked && (
            <span className="bar-checkmark" />
          )}
        </span>
        <span className="floatRight">{getPercentage() + "%"}</span>
        <div
          className={barBorderRadiusClasses()}
          style={{ width: addAdditionalPercentageValueForTheSakeOfUI() }}
        />
      </div>
    </>
  );
};

export default PollBar;
