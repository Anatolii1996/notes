import { useState, useEffect } from "react";
import moment from "moment";

import { Outlet } from "react-router-dom";

const TimeHeader = () => {
  const [currentTime, setCurrentTime] = useState(moment().format("LL HH:mm"));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment().format("LL HH:mm"));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="time_header">
      <p className="time">{currentTime}</p>
      <Outlet />
    </div>
  );
};
export default TimeHeader;
