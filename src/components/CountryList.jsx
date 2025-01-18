import React from "react";
import PropTypes from "prop-types";
import CountryCard from "./CountryCard";
import "./CountryList.css";

const CountryList = ({ countries }) => {
  return (
    <div className="countries-container">
      {countries.length > 0 ? (
        countries.map((country) => (
          <CountryCard key={country.common} country={country} />
        ))
      ) : (
        <p>No matching countries found.</p>
      )}
    </div>
  );
};

CountryList.propTypes = {
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      common: PropTypes.string.isRequired,
      png: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CountryList;
