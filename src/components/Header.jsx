import { useState } from "react";
import { HiPlus } from "react-icons/hi";
import { BsTrash3 } from "react-icons/bs";
import { SlNote } from "react-icons/sl";
import { AutoComplete, Modal } from "antd";
import { SearchOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";




const Header = ({ removeRecord, idClicked, notes }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { confirm } = Modal;
const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure you want to delete this note?',
      icon: <ExclamationCircleFilled />,
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        removeRecord(notes.find((el) => el.id == idClicked).initialText);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <>
      <div className="header">
        <div className="btn_group">
          <Link to="/new">
            <HiPlus />
          </Link>

          <BsTrash3
            className={!idClicked ? "inactive" : ""}
            onClick={showDeleteConfirm} type="dashed"
            // onClick={() => {
            //   removeRecord(notes.find((el) => el.id == idClicked).initialText);
            // }}
          />
          <Link to="/change" className={!idClicked ? "inactive" : ""}>
            <SlNote />
          </Link>
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
