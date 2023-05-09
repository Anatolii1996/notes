import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const ChangeNote = ({ idClicked, notes }) => {
  const [currentNote, setCurrentNote] = useState(null);
  useEffect(() => {
    setCurrentNote(notes.find((el) => el.id == idClicked).text);
  }, [idClicked]);

  

  return (
    <div className="change_note">
      <textarea cols="100" rows="10" value={currentNote}>
        
      </textarea>
    </div>
  );
};
export default ChangeNote;
