import React, { useState } from "react";
import Fuse from "fuse.js";
import "../../pages/Weapons/Weapons.css";
import SearchBar from "../Reusable/Search";

export default function WeaponFilter({
  weapons,
  onSearchChange,
  setSelectedWeapon,
}) {
  const [itemSearch, setItemSearch] = useState("");

  const fuse = new Fuse(weapons, {
    includeScore: true,
    threshold: 0.3,
    keys: ["name"],
  });
  console.log("Search results:", fuse.search(itemSearch));

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setItemSearch(value);
    onSearchChange(value);
  };

  const filteredWeapons = itemSearch
    ? fuse.search(itemSearch).map((result) => result.item)
    : weapons;

  return (
    <div className="filter-container">
      <label className="filter-label">Filter by Type</label>

      <input
        type="text"
        placeholder="Search..."
        value={itemSearch}
        onChange={handleSearchChange}
      />
      <ul>
        {filteredWeapons.map((item, index) => (
          <li key={index} onClick={() => setSelectedWeapon(item)}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
