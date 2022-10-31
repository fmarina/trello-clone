import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  DeleteOutlineOutlined,
  DashboardOutlined,
  PersonOutlineOutlined,
  Settings,
  TableChartOutlined,
  CalendarMonthOutlined,
} from "@mui/icons-material";
import "./index.scss";
import { DELETE_BOARD } from "../../../board/actions";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { boards } = useSelector((state) => state.boardReducer);

  const removeBoard = (id) => {
    dispatch({
      type: DELETE_BOARD,
      payload: id,
    });
  };

  const listBoards = boards.map((board) => (
    <li key={board.id}>
      <Link to={`/${board.id}`}>{board.title}</Link>
      <button type="button" onClick={() => removeBoard(board.id)}>
        <DeleteOutlineOutlined />
      </button>
    </li>
  ));

  return (
    <nav className="sidebar">
      <ul>
        <li>
          <DashboardOutlined />
          Boards
        </li>
        <li>
          <PersonOutlineOutlined />
          Members
        </li>
        <li>
          <Settings /> Settings
        </li>
        <li>
          <p>Workspace views</p>
        </li>
        <li>
          <TableChartOutlined />
          Table
        </li>
        <li>
          <CalendarMonthOutlined />
          Calendar
        </li>
        <li>
          <p>Your boards</p>
          <ul>{listBoards}</ul>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
