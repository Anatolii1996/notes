import { HiPlus } from "react-icons/hi";
import { BsTrash3 } from "react-icons/bs";
import { SlNote } from "react-icons/sl";

const Header = () => {
  return (
    <div className="header">
      <div className="btn_group">
        <HiPlus />
        <BsTrash3 />
        <SlNote />
      </div>
      <div className="search">
       
      </div>
    </div>
  );
};
export default Header;
