import React, { useContext, useEffect } from "react";
import { DataContext } from "./DataProvider";
import "./weaponsDetail.css";
import useLocalStorage from "../useLocalStorage";

import UpgradesAffinities from "./UpgradesAffinities";

export default function WeaponDetail({
  weapon,
  setSelectedWeapon,
  selectedWeapon,
}) {
  const { weapons } = useContext(DataContext);
  const [selectedUpgrade, setSelectedUpgrade] = useLocalStorage(
    "+0",
    selectedWeapon?.upgrades[0]?.upgrade || "+0"
  );
  const [selectedAffinity, setSelectedAffinity] = useLocalStorage(
    "Standard",
    selectedWeapon?.upgrades[0]?.affinity || "Standard"
  );

  useEffect(() => {
    if (selectedWeapon) {
      setSelectedAffinity((prevAffinity) => {
        return (
          prevAffinity || selectedWeapon?.upgrades[0]?.affinity || "Standard"
        );
      });

      setSelectedUpgrade((prevUpgrade) => {
        return prevUpgrade || selectedWeapon?.upgrades[0]?.upgrade || "+0";
      });
    }
  }, [selectedWeapon]);

  useEffect(() => {
    if (selectedWeapon?.name && weapons.length > 0) {
      const weaponData = weapons.find(
        (item) => item.name === selectedWeapon.name
      );

      if (weaponData) {
        const matchedUpgrade = weaponData.upgrades.find(
          (upgrade) =>
            upgrade.upgrade.trim() === selectedUpgrade.trim() &&
            upgrade.affinity.trim() === selectedAffinity.trim()
        );

        if (matchedUpgrade) {
          setSelectedWeapon({
            ...weaponData,
            damage: matchedUpgrade.attack_power,
            statScaling: matchedUpgrade.stat_scaling,
            damageReduction: matchedUpgrade.damage_reduction,
          });
        }
      }
    }
  }, [
    selectedUpgrade,
    selectedAffinity,
    selectedWeapon?.name,
    weapons,
    setSelectedWeapon,
  ]);

  if (!selectedWeapon) {
    return <p>Select a weapon, upgrade, and affinity</p>;
  }

  const affinityClasses = {
    Standard: "standard-affinity",
    Keen: "keen-affinity",
    Heavy: "heavy-affinity",
    Quality: "quality-affinity",
    Fire: "fire-affinity",
    Flame: "flame-affinity",
    Lightning: "lightning-affinity",
    Sacred: "sacred-affinity",
    Cold: "cold-affinity",
    Magic: "magic-affinity",
    Poison: "poison-affinity",
    Blood: "blood-affinity",
    Occult: "occult-affinity",
  };

  return (
    <div className="selected-weapon-container">
      <div className="weapon-details">
        <h2>
          {`${selectedWeapon.name} (`}{" "}
          <span
            className={`affinity ${
              affinityClasses[selectedAffinity] || "default-affinity"
            }`}
          >
            {selectedAffinity}
          </span>{" "}
          {`${selectedUpgrade})`}
        </h2>
        <h4>{selectedWeapon.category}</h4>
        <h4>
          Weapon Skill:
          <span className="weapon-skill"> {selectedWeapon.skill}</span>
        </h4>
        <div className="weapon-image">
          <img
            src={selectedWeapon.image}
            className="selected-weapon-image"
            alt={selectedWeapon.name}
          />
        </div>
        <p>{selectedWeapon.description}</p>
        <div className="temp"></div>
      </div>
      <div className="upgrades-affinities">
        <UpgradesAffinities
          weapon={weapon}
          selectedUpgrade={selectedUpgrade}
          selectedAffinity={selectedAffinity}
          setSelectedUpgrade={setSelectedUpgrade}
          setSelectedAffinity={setSelectedAffinity}
          selectedWeapon={selectedWeapon}
          setSelectedWeapon={setSelectedWeapon}
        />
      </div>
      <div className="weapon-stats">
        <table>
          <tbody>
            {/* Attack Power */}
            <tr>
              <td colSpan="2">
                <strong>Attack Power</strong>
              </td>
            </tr>
            {Object.entries(selectedWeapon.damage || {}).map(
              ([type, value]) => (
                <tr key={`damage-${type}`}>
                  <td>{type}</td>
                  <td>{value}</td>
                </tr>
              )
            )}
            {/* Stat Scaling */}
            <tr>
              <td colSpan="2">
                <strong>Stat Scaling</strong>
              </td>
            </tr>
            {Object.entries(selectedWeapon.statScaling || {}).map(
              ([stat, value]) => (
                <tr key={`scaling-${stat}`}>
                  <td>{stat}</td>
                  <td>{value}</td>
                </tr>
              )
            )}
            {/* Stat Requirements */}
            <tr>
              <td colSpan={"2"}>
                <strong>Weapon Requirements</strong>
              </td>
            </tr>
            {Object.entries(selectedWeapon.requirements).map(
              ([stat, value]) => (
                <tr key={`stat-${stat}`}>
                  <td>{stat}</td>
                  <td>{value}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
