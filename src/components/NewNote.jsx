import { useState, useEffect } from "react";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

const NewNote = ({ setNotes }) => {
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
      <textarea
        value={newNote}
        onChange={(e) => {
          setNewNote(e.target.value);
        }}
        onBlur={()=>{setNotes((prev) => [...prev, { id: uuidv4(), text: newNote }])}}
        cols="100"
        rows="10"
      ></textarea>
    </div>
  );
};
export default NewNote;
