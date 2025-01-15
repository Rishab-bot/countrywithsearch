import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./search.css";

export function FlagSearch() {
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    const debounceTimeout = useRef(null);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get("https://countries-search-data-prod-812920491762.asia-south1.run.app/countries");
                setCountries(response.data);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };
        fetchCountries();
    }, []);

    useEffect(() => {
        if (debouncedSearchTerm === searchTerm) return;
        clearTimeout(debounceTimeout.current);
        debounceTimeout.current = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);
    }, [searchTerm]);

    const filteredCountries = countries.filter(country =>
        country.common.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );

    return (
        <div>
            <h1>Flags & Countries</h1>
            <input
                type="text"
                placeholder="Search for a country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
            />
            <div className="flag-grid">
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
        </div>
    );
}
