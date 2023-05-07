import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import moment from "moment";

const ListItem = ({ note, setNotes, notes }) => {
  const findDate = (str) => {
    let date = new Date(str);
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // Месяцы начинаются с 0, поэтому нужно добавить 1
    let day = date.getDate();
    let formattedDate = `${year}${month.toString().padStart(2, "0")}${day
      .toString()
      .padStart(2, "0")}`;
    return formattedDate;
  };

  useEffect(()=>{
    const noteDate = findDate(note.date);
    const currentDay = moment().format("YYYYMMDD");
    if(currentDay==noteDate){
        setNotes()
        console.log(notes.find((el)=>el.id==note.id).text.replace(/\*\*(.*?)\*\*/g, String(moment().format("HH:mm A"))));
    }
  }, [])

  useEffect(() => {}, []);

  return (
    <div className="list_item">
      <ReactMarkdown>{note.text}</ReactMarkdown>
    </div>
  );
};
export default ListItem;
