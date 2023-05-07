import {  Outlet } from "react-router-dom";
import ListItem from "./ListItem";


const Sidebar = ({notes, setNotes}) => {
  return(
    <>
    <div className="sidebar">
      {notes&&notes.map((el)=>{
        return(
          <ListItem key={el.id} note={el} setNotes={setNotes} notes={notes}/>
        )
      })}
    </div>
    <Outlet/>
    </>
  ) 
};
export default Sidebar;
