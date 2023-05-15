import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from 'react-redux';

const WorkSpace = ({ notes }) => {
  const [currentNote, setCurrentNote] = useState("");
  const idClicked = useSelector((state) => state.idClicked.value);
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
