import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  const convertToMark = (note) => {
    const changedHead = "#### " + note.split("\n")[0] + "\n";
    const changedBody =
    String(`**${moment().format("M/D/YY")}**`) + " " + note.split("\n")[1];
    return changedHead + changedBody;
  };

  return (
    <div className="new_note">
      <p className="time">{currentTime}</p>
      <textarea autoFocus
        value={newNote}
        onChange={(e) => {
          setNewNote(e.target.value);
        }}
        onBlur={() => {
          if(newNote){
            setNotes((prev) => [
            {
              id: uuidv4(),
              initialText: convertToMark(newNote),
              text: convertToMark(newNote),
              minute: String(moment().format("HH:mm A")),
              date: String(moment().format("M/D/YY")),
              time: String(moment().format('MMMM D, YYYY [at] HH:mm A'))
            },
            ...prev,
          ]);
          setNewNote("");
          navigate("/")
          }
          
        }}
        cols="100"
        rows="10"
      ></textarea>
    </div>
  );
};
export default NewNote;
