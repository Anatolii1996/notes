import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ChangeNote = ({ notes }) => {
  const [currentNote, setCurrentNote] = useState("");
  const idClicked = useSelector((state) => state.idClicked.value);

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
          value={currentNote.initialText.replace(/\*+.*?\*+/g, "").replace(/[#_]+/g, "")}
          onChange={() => {}}
        ></textarea>
      )}
    </div>
  );
};
export default ChangeNote;
