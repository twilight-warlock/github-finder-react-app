import React from "react";
import PropTypes from "prop-types";

const Useritem = ({ user: { login, avatar_url, html_url } }) => {
  // const { login, avatar_url, html_url } = props.user;
  return (
    <div className="card text-center">
      <img
        src={avatar_url}
        alt="logo"
        className="round-img"
        style={{ width: "60px" }}
      ></img>
      <h3>{login}</h3>
      <div>
        <a href={html_url} className="btn btn-dark btn-sm my-1">
          More Info
        </a>
      </div>
    </div>
  );
};

Useritem.propTypes = {
  user: PropTypes.object.isRequired,
};
export default Useritem;
