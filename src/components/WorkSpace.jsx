import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const WorkSpace = ({ notes, idClicked }) => {
  const [currentNote, setCurrentNote] = useState({});

  useEffect(() => {
    setCurrentNote(notes.find((el) => el.id == idClicked));
  }, [idClicked]);

  return (
    <div>
      {currentNote.text && <ReactMarkdown>{currentNote.text}</ReactMarkdown>}
    </div>
  );
};
export default WorkSpace;
