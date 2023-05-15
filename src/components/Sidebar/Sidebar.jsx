import { Outlet } from "react-router-dom";
import ListItem from "../ListItem/ListItem";

const Sidebar = ({ notes, setNotes, findDate}) => {
  

  return (
    <>
      <div className="sidebar">
        {notes &&
          notes.map((el) => {
            return (
              <ListItem
                key={el.id}
                note={el}
                setNotes={setNotes}
                notes={notes}
                findDate={findDate}
               
              />
            );
          })}
      </div>
      <Outlet />
    </>
  );
};
export default Sidebar;
