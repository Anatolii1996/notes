import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { convertToMark } from "./NewNote";
import { v4 as uuidv4 } from "uuid";

const ChangeNote = ({ notes, setNotes }) => {
  const [currentNote, setCurrentNote] = useState("");
  const [currentText, setCurrentText] = useState("");
  const idClicked = useSelector((state) => state.idClicked.value);

  const handleBlur = () => {
    if (currentText) {
      const filteredNotes = notes.filter((el)=>el.id!=currentNote.id);
      const changeNote=notes.filter((el)=>el.id==currentNote.id).map((el)=>{
        return {...el, text:convertToMark(currentText), initialText:convertToMark(currentText) }
      })
      setNotes([...filteredNotes, ...changeNote]);
    }
  };

  useEffect(() => {
    const note = notes.find((el) => el.id == idClicked);
    if (note) {
      setCurrentNote(note);
    }
  }, [idClicked, notes]);

  useEffect(()=>{
    if(currentNote){
      setCurrentText(currentNote.initialText.replace(/\*+.*?\*+/g, "").replace(/[#_]+/g, ""));

    }
  }, [currentNote])

  return (
    <div className="change_note">
      <p className="time">{currentNote.time}</p>
      
        <textarea
          cols="100"
          rows="10"
          value={currentText}
          onChange={(e) => {setCurrentText(e.target.value)}}
          onBlur={handleBlur}
        ></textarea>
      
    </div>
  );
};
export default ChangeNote;
