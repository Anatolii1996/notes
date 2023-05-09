import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const WorkSpace = ({ notes, idClicked }) => {
  const [currentNote, setCurrentNote] = useState("");

  useEffect(() => {
    if (idClicked) {
      setCurrentNote(
        notes.find((el) => el.id == idClicked)
      );
    }
  }, [idClicked]);

  return (
    <div className="work_space">
      <p className="time">{currentNote.time}</p>
      {currentNote && <ReactMarkdown>{currentNote.text.replace(/\*+.*?\*+/g, "")}</ReactMarkdown>}
    </div>
  );
};
export default WorkSpace;
