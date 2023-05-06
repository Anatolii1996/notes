import { HiPlus } from "react-icons/hi";
import { BsTrash3 } from "react-icons/bs";
import { SlNote } from "react-icons/sl";
import { AutoComplete } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="header">
        <div className="btn_group">
          <Link to="/new">
            <HiPlus />
          </Link>

          <BsTrash3 />
          <SlNote />
        </div>
        <div className="search">
          <SearchOutlined
            style={{
              color: "#d9d9d9",
            }}
          />
          <AutoComplete
            // options={options}
            // style={{
            //     border:0,
            //     outline: "none",
            //     boxShadow: 0
            // }}
            // onSelect={onSelect}
            // onSearch={(text) => setOptions(getPanelValue(text))}
            placeholder="Search"
          />
        </div>
      </div>
      <Outlet />
    </>
  );
};
export default Header;
