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
  const { weapons } = useContext(DataContext);
  const [filteredUpgrades, setFilteredUpgrades] = useState([]);
  const [filteredAffinities, setFilteredAffinities] = useState([]);
  const [previousWeaponName, setPreviousWeaponName] = useState("");

  useEffect(() => {
    if (selectedWeapon?.name && selectedWeapon.name !== previousWeaponName) {
      setSelectedUpgrade("+0");
      setSelectedAffinity("Standard");
      setPreviousWeaponName(selectedWeapon.name);
    }
  }, [selectedWeapon, previousWeaponName]);

  useEffect(() => {
    if (selectedWeapon?.name) {
      const weaponData = weapons.find(
        (item) => item.name === selectedWeapon.name
      );

      if (weaponData) {
        setFilteredUpgrades([
          ...new Set(weaponData.upgrades.map((item) => item.upgrade.trim())),
        ]);

        setFilteredAffinities([
          ...new Set(weaponData.upgrades.map((item) => item.affinity.trim())),
        ]);
      } else {
        setFilteredUpgrades([]);
        setFilteredAffinities([]);
      }
    } else {
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
