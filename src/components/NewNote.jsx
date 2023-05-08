import { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

const NewNote = ({ setNotes }) => {
  const [newNote, setNewNote] = useState("");

  const navigate = useNavigate();

  const convertToMark = (note) => {
    const changedHead = "#### " + note.split("\n")[0] + "\n";
    const changedBody =
      String(`**${moment().format("M/D/YY")}**`) + " " + note.split("\n")[1];
    return changedHead + changedBody;
  };

  return (
    <div className="new_note">
      <textarea
        value={newNote}
        onChange={(e) => {
          setNewNote(e.target.value);
        }}
        onBlur={() => {
          setNotes((prev) => [
            {
              id: uuidv4(),
              initialText: convertToMark(newNote),
              text: convertToMark(newNote),
              date: String(moment().format("M/D/YY")),
            },
            ...prev,
          ]);
          setNewNote("");
          navigate("/")
        }}
        cols="100"
        rows="10"
      ></textarea>
    </div>
  );
};
export default NewNote;
