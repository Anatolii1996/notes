import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import moment from "moment";

const WorkSpace = ({ notes, idClicked }) => {
  const [currentNote, setCurrentNote] = useState({});

  useEffect(() => {
    setCurrentNote(notes.find((el) => el.id == idClicked));
  }, [idClicked]);

  return <div>
<ReactMarkdown>{currentNote.text}</ReactMarkdown>
  </div>;
};
export default WorkSpace;
