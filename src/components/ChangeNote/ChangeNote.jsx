import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { convertToMark } from "../NewNote/NewNote";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { setCurrentItem } from "../../redux/currentNoteSlice";

const ChangeNote = ({ notes, setNotes, removeRecord }) => {
  const [currentNote, setCurrentNote] = useState("");
  const [currentText, setCurrentText] = useState("");
  const idClicked = useSelector((state) => state.idClicked.value);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (note) {
      dispatch(setCurrentItem(note));
      
    }
  }, []);
  const noteItem = useSelector((state) => state.currentNote.value);

  const handleBlur = () => {
    removeRecord(notes.find((el) => el.id == idClicked).initialText);
    
    const newNoteItem = { ...noteItem, text:convertToMark(currentNote.text) , initialText: convertToMark(currentNote.text), };
    setNotes(prevNotes => [...prevNotes, newNoteItem]);
    navigate("/");
  };
  const note = notes.find((el) => el.id == idClicked);

 
  
  useEffect(() => {
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
              text: e.target.value,
            });
          }}
          onBlur={handleBlur}
        ></textarea>
      )}
    </div>
  );
};
export default ChangeNote;
