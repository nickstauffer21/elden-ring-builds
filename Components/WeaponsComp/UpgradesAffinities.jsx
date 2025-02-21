import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "./DataProvider";
import "./weaponsDetail.css";

export default function UpgradesAffinities({
  weapon,
  selectedUpgrade,
  setSelectedUpgrade,
  selectedAffinity,
  setSelectedAffinity,
  selectedWeapon,
}) {
  const { weapons } = useContext(DataContext); // Use weapons instead of weaponsLevelInfo
  const [filteredUpgrades, setFilteredUpgrades] = useState([]);
  const [filteredAffinities, setFilteredAffinities] = useState([]);
  const [previousWeaponName, setPreviousWeaponName] = useState("");

  useEffect(() => {
    if (selectedWeapon?.name && selectedWeapon.name !== previousWeaponName) {
      // It's a truly new weapon selection, reset to defaults
      setSelectedUpgrade("+0");
      setSelectedAffinity("Standard");
      setPreviousWeaponName(selectedWeapon.name);
    }
  }, [selectedWeapon, previousWeaponName]);

  useEffect(() => {
    if (selectedWeapon?.name) {
      // Find the selected weapon in weapons
      const weaponData = weapons.find(
        (item) => item.name === selectedWeapon.name
      );

      if (weaponData) {
        // Extract unique upgrades and affinities
        setFilteredUpgrades([
          ...new Set(weaponData.upgrades.map((item) => item.upgrade.trim())),
        ]);

        setFilteredAffinities([
          ...new Set(weaponData.upgrades.map((item) => item.affinity.trim())),
        ]);
      } else {
        // Reset if no matching weapon data is found
        setFilteredUpgrades([]);
        setFilteredAffinities([]);
      }
    } else {
      // Reset if no weapon is selected
      setFilteredUpgrades([]);
      setFilteredAffinities([]);
    }
  }, [selectedWeapon?.name, weapons]);

  return (
    <div className="custom-dropdown">
      <label className="upgrade-affinities-label">Upgrade Level: </label>
      <div className="dropdown">
        <div className="dropdown-selected">{selectedUpgrade}</div>
        <ul className="dropdown-options">
          {filteredUpgrades.map((level) => (
            <li
              key={level}
              className="dropdown-option"
              onClick={() => setSelectedUpgrade(level)}
            >
              {level}
            </li>
          ))}
        </ul>
      </div>

      <label className="upgrade-affinities-label">Affinity: </label>
      <div className="dropdown">
        <div className="dropdown-selected">{selectedAffinity}</div>
        <ul className="dropdown-options">
          {filteredAffinities.map((affinity) => (
            <li
              key={affinity}
              className="dropdown-option"
              onClick={() => setSelectedAffinity(affinity)}
            >
              {affinity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
