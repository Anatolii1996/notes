import { useState } from "react";
import { Outlet } from "react-router-dom";
import ListItem from "./ListItem";

const Sidebar = ({ notes, setNotes, findDate, idClicked, setIdClicked }) => {
  

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
                setIdClicked={setIdClicked}
                idClicked={idClicked}
              />
            );
          })}
      </div>
      <Outlet />
    </>
  );
};
export default Sidebar;
