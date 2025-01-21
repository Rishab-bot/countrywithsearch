import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import CountryCard from './components/CountryCard';
import './App.css'; // Importing the CSS file

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://countries-search-data-prod-812920491762.asia-south1.run.app/countries')
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term) {
      setFilteredCountries(countries); // Show all countries if search is empty
    } else {
      const filtered = countries.filter((country) =>
        country.common.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  };

  return (
    <div>
      <div className="search-container">
        <Search searchTerm={searchTerm} onSearch={handleSearch} />
      </div>
      <div className="countries-container">
        {filteredCountries.length === 0 ? (
          <p>No countries found</p>
        ) : (
          filteredCountries.map((country) => (
            <CountryCard key={country.common} country={country} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
