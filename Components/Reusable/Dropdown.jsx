import React, { useState, useEffect, useRef } from "react";
import "../../pages/Builds/Builds.css";

export default function Dropdown({
  items,
  onSelect,
  selectedItem,
  isOpen,
  onToggle,
}) {
  const dropdownRef = useRef(null);

  const displayName = selectedItem?.name || "Select...";

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      onToggle(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      onToggle(!isOpen);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="item-dropdown" ref={dropdownRef}>
      <div
        className="item-dropdown-selected"
        onClick={() => onToggle(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        role="button"
        tabIndex={0}
      >
        {displayName}
      </div>
      {isOpen && (
        <ul className="item-dropdown-selection">
          {items.map((item) => (
            <li
              key={item.id}
              className="item-dropdown-option"
              onClick={() => onSelect(item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
