import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./search.css";

export function FlagSearch() {
    const [countries, setCountries] = useState([]); 
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(""); 
    const [loading, setLoading] = useState(true); // Loading state for API fetch

    const debounceTimeout = useRef(null); // Ref to store debounce timeout

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
            } finally {
                setLoading(false); // Stop loading after fetching
            }
        };
        fetchCountries();
    }, []);

    // Debounce logic for the search term
    useEffect(() => {
        if (debouncedSearchTerm === searchTerm) return;
        clearTimeout(debounceTimeout.current);
        debounceTimeout.current = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm); // Set debounced search term after timeout
        }, 300); // Reduced debounce delay for better responsiveness
    }, [searchTerm]);

    // Filter countries based on the debounced search term
    const filteredCountries = countries.filter((country) =>
        country.common.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );

    // JSX for rendering the component
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
            {/* Loading State */}
            {loading ? (
                <h3>Loading...</h3>
            ) : (
                // Render Countries or "No Results" message
                <>
                    {filteredCountries.length === 0 ? (
                        <h3>No countries found</h3>
                    ) : (
                        <div className="countryCard">
                            {filteredCountries.map((country, index) => (
                                <div className="flag-item" key={index}>
                                    <img
                                        src={country.png}
                                        alt={country.common}
                                        className="flag-image"
                                    />
                                    <p>{country.common}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
