import React from "react";
import moment from "moment";

export default function useTimeDuration(then) {
  const [duration, setDuration] = React.useState("");

  React.useEffect(() => {
    const isPlural = num => (num > 1 ? "s" : "");
    const now = new Date();
    let duration = moment.duration(moment(now).diff(moment(then)));
    let inDays = Math.abs(Math.round(duration.days()));
    let inHours = Math.abs(Math.round(duration.asHours()));
    let inMinutes = Math.abs(Math.round(duration.minutes()));

    if (inDays === 0) {
      setDuration(inHours + " hour" + isPlural(inHours));
      if (inHours === 0) {
        setDuration(inMinutes + " minute" + isPlural(inMinutes));
      }
    } else {
      setDuration(inDays + isPlural(inHours));
    }
  }, [then]);

  return duration;
}
