import { useState, useEffect } from "react";
import moment from 'moment';

const NewNote = () => {
  const [newNote, setNewNote] = useState("");
  const [currentTime, setCurrentTime] = useState(moment().format("LL HH:mm"));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment().format("LL HH:mm"));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="new_note">
      <p className="time">{currentTime}</p>
      <textarea name="" id="" cols="100" rows="10"></textarea>
    </div>
  );
};
export default NewNote;
