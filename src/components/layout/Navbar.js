import React from "react";
import PropTypes from "prop-types";

const Navbar = ({ icon, title }) => {
  return (
    <nav className="navbar bg-primary">
      <h1>
        <i className={icon}></i> {title}
      </h1>
    </nav>
  );
};

// Default values to the Navbar Component
Navbar.defaultProps = {
  title: "Github Finder",
  icon: "fa fa-github",
};

// Property type check
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Navbar;
