import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { convertToMark } from "./NewNote";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const ChangeNote = ({ notes, setNotes, removeRecord }) => {
  const [currentNote, setCurrentNote] = useState("");
  const [currentText, setCurrentText] = useState("");
  const idClicked = useSelector((state) => state.idClicked.value);

  const navigate = useNavigate();

  const handleBlur = () => {
    setNotes(notes.map((note) => {
      if (note.id === idClicked) {
        return { ...note, text:convertToMark(currentNote.text), initialText: convertToMark(currentNote.text), };
      }
      return note;
    }));
    navigate("/")
  };

  useEffect(() => {
    const note = notes.find((el) => el.id == idClicked);
    if (note) {
      setCurrentNote(note);
    }
  }, [idClicked, notes]);


  return (
    <div className="change_note">
      <p className="time">{currentNote.time}</p>
      {currentNote && (
        <textarea
          cols="100"
          rows="10"
          value={currentNote.text
            .replace(/\*+.*?\*+/g, "")
            .replace(/[#_]+/g, "")}
          onChange={(e) => {
            setCurrentNote({
              ...currentNote,
              text: e.target.value
            });
          }}
          onBlur={handleBlur}
        ></textarea>
      )}
    </div>
  );
};
export default ChangeNote;
