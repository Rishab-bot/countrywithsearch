import React from "react";
import PropTypes from "prop-types";
import "./SearchBar.css";

const SearchBar = ({ setSearchTerm }) => {
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for a country..."
        onChange={handleInputChange}
      />
    </div>
  );
};

SearchBar.propTypes = {
  setSearchTerm: PropTypes.func.isRequired,
};

export default SearchBar;
