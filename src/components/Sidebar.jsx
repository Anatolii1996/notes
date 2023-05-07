import {  Outlet } from "react-router-dom";
import ListItem from "./ListItem";

const Sidebar = ({notes}) => {
  return(
    <>
    <div className="sidebar">
      {notes&&notes.map((el)=>{
        return(
          <ListItem note={el}/>
        )
      })}
    </div>
    <Outlet/>
    </>
  ) 
};
export default Sidebar;
