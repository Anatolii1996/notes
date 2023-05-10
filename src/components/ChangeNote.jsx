import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

const ChangeNote = ({ notes }) => {
  const [currentNote, setCurrentNote] = useState("");
  const idClicked = useSelector((state) => state.idClicked.value);
  // const navigate = useNavigate();

  useEffect(() => {
    const note = notes.find((el) => el.id == idClicked);
    if (note) {
      setCurrentNote(note.text);
    }
  }, [idClicked, notes]);

  return (
    <div className="change_note">
      <textarea
        cols="100"
        rows="10"
        value={currentNote}
        onChange={() => {}}
      ></textarea>
    </div>
  );
};
export default ChangeNote;
