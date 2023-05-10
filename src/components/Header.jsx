import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import { BsTrash3 } from "react-icons/bs";
import { SlNote } from "react-icons/sl";
import { AutoComplete, Modal } from "antd";
import { SearchOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setClicked } from "../redux/idClickedSlice";

const Header = ({ removeRecord, notes }) => {
  const [options, setOptions] = useState([]);

  const idClicked = useSelector((state) => state.idClicked.value);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { confirm } = Modal;

  const changeData = (arr) => {
    return [
      ...arr.map((el) => {
        return {
          label: el.initialText.replace(/\n/g, " ").replace(/[#*_]+/g, ""),
          value: el.initialText.replace(/\n/g, " ").replace(/[#*_]+/g, ""),
          id: el.id
        };
      }),
    ];
  };

  const onSelect = (value, obj) => {
    dispatch(setClicked(obj.id))
  };

  useEffect(() => {
    if (notes) {
      setOptions(changeData(notes));
    }
  }, [notes]);

  

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure you want to delete this note?",
      icon: <ExclamationCircleFilled />,
      content: "",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        removeRecord(notes.find((el) => el.id == idClicked).initialText);
        navigate("/");
      },
      onCancel() {
        console.log("Cancel");
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
            onClick={showDeleteConfirm}
            type="dashed"
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
            options={options}
            filterOption={true}
            // style={{
            //     border:0,
            //     outline: "none",
            //     boxShadow: 0
            // }}
            onSelect={onSelect}
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
