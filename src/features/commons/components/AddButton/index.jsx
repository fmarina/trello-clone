import React from "react";
import AddIcon from "@mui/icons-material/Add";
import "./index.scss";

const AddButton = ({ text = "", handleOnClick = () => {}, className = "" }) => {
  const addButtonStyle = `add-button ${className}`;
  return (
    <button type="button" className={addButtonStyle} onClick={handleOnClick}>
      <AddIcon />
      <p>{text}</p>
    </button>
  );
};

export default AddButton;
