import {  Outlet } from "react-router-dom";

const Sidebar = () => {
  return(
    <>
    <div className="sidebar"></div>
    <Outlet/>
    </>
  ) 
};
export default Sidebar;
