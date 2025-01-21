import React from 'react';

const Search = ({ searchTerm, onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search for a country..."
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default Search;
