import React from "react";
import PropTypes from "prop-types";
import "./CountryCard.css";

const CountryCard = ({ country }) => {
  return (
    <div className="country-card">
      <img src={country.png} alt={`${country.common} flag`} />
      <h2>{country.common}</h2>
    </div>
  );
};

CountryCard.propTypes = {
  country: PropTypes.shape({
    common: PropTypes.string.isRequired,
    png: PropTypes.string.isRequired,
  }).isRequired,
};

export default CountryCard;
