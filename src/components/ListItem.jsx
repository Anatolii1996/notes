import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import moment from "moment";

const ListItem = ({ note, setNotes, findDate, setIdClicked, idClicked }) => {
  useEffect(() => {
    const noteDate = findDate(note.date);
    const currentDay = moment().format("YYYYMMDD");
    if (currentDay == noteDate) {
      setNotes((notes) => {
        // make a copy of the notes array
        const updatedNotes = [...notes];

        // find the index of the note to update
        const index = updatedNotes.findIndex((el) => el.id === note.id);

        // update the text of the note with the current time
        updatedNotes[index] = {
          ...updatedNotes[index],
          text: updatedNotes[index].text.replace(
            /\*\*(.*?)\*\*/g,
            String(`**${moment().format("HH:mm A")}**`)
          ),
        };

        // return the updated notes array
        return updatedNotes;
      });
    }
  }, []);

  
  return (
    <div
      className={`list_item ${idClicked == note.id ? "clicked" : ""}`}
      onClick={() => {
        setIdClicked(note.id);
      }}
    >
      <ReactMarkdown>{note.text}</ReactMarkdown>
    </div>
  );
};
export default ListItem;
