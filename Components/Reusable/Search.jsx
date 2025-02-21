import React, { useState, useEffect, useRef } from "react";
import "./Search.css";

export default function SearchBar({ data, onSearchChange, setSelectedItem }) {
  const [searchItem, setSearchItem] = useState("");
  const [showResults, setShowResults] = useState(false);

  const searchRef = useRef(null);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchItem(value);
    onSearchChange(value);
    setShowResults(value.length > 0);
  };

  const handleSelection = (item) => {
    setSelectedItem(item);
    setSearchItem("");
    setShowResults(false);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowResults(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  const showIcon = searchItem.length === 0;

  return (
    <div>
      <div className="search-bar" ref={searchRef}>
        <div className="input-wrapper">
          <input
            className="input"
            type="text"
            value={searchItem}
            onChange={handleSearchChange}
          />
          {showIcon && <i className="fa-solid fa-magnifying-glass"></i>}
        </div>
        {showResults && (
          <div className="search-results">
            {filteredData.map((item, index) => (
              <p
                className="search-result"
                key={index}
                onClick={() => handleSelection(item)}
              >
                {item.name}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
