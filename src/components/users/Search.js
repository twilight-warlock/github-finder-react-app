import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ showClear, clearUsers, searchUsers, setAlert }) => {
  const [text, setText] = useState("");

  // It will store the value as it is entered to each matching name field
  const onChange = (e) => setText(e.target.value);

  // The function to be carried out on form submission
  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter a value", "light");
    } else {
      searchUsers(text);
      setText("");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search users"
          value={text}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {showClear && (
        <button className="btn btn-light btn-block" onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default Search;
