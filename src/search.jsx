import React, { useEffect, useState } from "react";
import axios from "axios";
import "./search.css";

// Utility function to debounce input
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function FlagSearch() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // Loading state for API fetch
  const [error, setError] = useState(null); // Error handling state

  // Debounced search term
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Delay in ms for debounce

  // Fetch countries from API on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
        );
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setError("Failed to load countries.");
      } finally {
        setLoading(false); // Stop loading after fetching
      }
    };
    fetchCountries();
  }, []);

  // Filter countries based on the debounced search term
  const filteredCountries = countries.filter((country) =>
    country.common.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Flags & Countries</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Error Handling */}
      {error && <h3>{error}</h3>}

      {/* Loading State */}
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        // Render Countries or "No Results" message
        <div className="countryCard">
          {filteredCountries.length === 0 ? (
            <h3>No countries found</h3>
          ) : (
            filteredCountries.map((country, index) => (
              <div className="flag-item" key={index}>
                <img
                  src={country.png}
                  alt={country.common}
                  className="flag-image"
                />
                <p>{country.common}</p> {/* Ensure country name is inside <p> */}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
