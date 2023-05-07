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

  const convertToMark = (note) => {
    const changedHead ="#### "+ note.split("\n")[0]+"\n";
    const changedBody=String(`**${moment().format("M/D/YY")}**`)+" " + note.split("\n")[1];
   return changedHead+changedBody;
  };

  return (
    <div className="new_note">
      <p className="time">{currentTime}</p>
      <textarea
        value={newNote}
        onChange={(e) => {
          setNewNote(e.target.value);
        }}
        onBlur={() => {
          setNotes((prev) => [
            {
              id: uuidv4(),
              text: convertToMark(newNote),
              date: String(moment().format("LL HH:mm")),
            },
            ...prev,
          ]);
          setNewNote("");
          convertToMark(newNote);
        }}
        cols="100"
        rows="10"
      ></textarea>
    </div>
  );
};
export default NewNote;
