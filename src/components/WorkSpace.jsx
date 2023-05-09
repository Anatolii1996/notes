import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const WorkSpace = ({ notes, idClicked }) => {
  const [currentNote, setCurrentNote] = useState("");

  useEffect(() => {
    if (idClicked) {
      setCurrentNote(
        notes
          .find((el) => el.id == idClicked)
          .text.replace(/\*\*\*\*.*?\*\*\*\*/g, "")
      );
    }
  }, [idClicked]);

  return (
    <div>{currentNote && <ReactMarkdown>{currentNote}</ReactMarkdown>}</div>
  );
};
export default WorkSpace;
