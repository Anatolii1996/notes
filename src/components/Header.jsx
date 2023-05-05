import { HiPlus } from "react-icons/hi";
import { BsTrash3 } from "react-icons/bs";
import { SlNote } from "react-icons/sl";
import { AutoComplete } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const Header = () => {
  return (
    <div className="header">
      <div className="btn_group">
        <HiPlus />
        <BsTrash3 />
        <SlNote />
      </div>
      <div className="search">
        <SearchOutlined style={{
         color: "#d9d9d9"
        }}/>
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
  );
};
export default Header;
