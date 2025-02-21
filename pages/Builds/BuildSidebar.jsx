import React, { useContext } from "react";
import { DataContext } from "../../Components/WeaponsComp/DataProvider";
import "./Builds.css";

export default function BuildSidebar({
  selectedHelmet,
  selectedChest,
  selectedGauntlets,
  selectedGreaves,
  selectedTalismanId1,
  selectedTalismanId2,
  selectedTalismanId3,
  selectedTalismanId4,
  selectedWeaponId1,
  selectedWeaponId2,
  selectedWeaponId3,
  selectedWeaponId4,
}) {
  const { armor, talismans, weapons } = useContext(DataContext);

  const getItemByid = (ids, collection) =>
    ids.map((id) => collection.find((item) => item.id === id)).filter(Boolean);

  const selectedArmor = [
    selectedHelmet,
    selectedChest,
    selectedGauntlets,
    selectedGreaves,
  ]
    .map((id) => armor.find((item) => item.id === id))
    .filter(Boolean);

  const selectedTalisman = getItemByid(
    [
      selectedTalismanId1,
      selectedTalismanId2,
      selectedTalismanId3,
      selectedTalismanId4,
    ],
    talismans
  );

  const selectedWeapons = getItemByid(
    [
      selectedWeaponId1,
      selectedWeaponId2,
      selectedWeaponId3,
      selectedWeaponId4,
    ],
    weapons
  );

  const allSelectedItems = [
    ...selectedArmor,
    ...selectedTalisman,
    ...selectedWeapons,
  ];

  const negationTypes = {
    damage: {
      Phy: "Physical",
      "VS Str": "VS Strike",
      "VS Sla": "VS Slash",
      "VS Pie": "VS Pierce",
      Mag: "Magic",
      Fir: "Fire",
      Lit: "Lightning",
      Hol: "Holy",
    },
    resistance: {
      "Imm.": "Immunity",
      "Foc.": "Focus",
      "Vit.": "Vitality",
      "Rob.": "Robustness",
      "Poi.": "Poison",
    },
  };

  const calculateTotalNegation = (type) => {
    const result = Object.keys(negationTypes[type]).reduce((acc, key) => {
      acc[key] = 0;
      return acc;
    }, {});

    selectedArmor.forEach((piece) => {
      const stats = piece[type === "damage" ? "damage negation" : "resistance"];
      if (!stats) return;

      Object.keys(result).forEach((key) => {
        result[key] += parseFloat(stats[key] || 0);
      });
    });

    if (type === "damage") {
      result.totalPhysical = (
        parseFloat(result.Phy || 0) +
        parseFloat(result["VS Str"] || 0) +
        parseFloat(result["VS Sla"] || 0) +
        parseFloat(result["VS Pie"] || 0)
      ).toFixed(1);
    }

    return result;
  };

  const totalDamageNegation = calculateTotalNegation("damage");
  const totalResistanceNegation = calculateTotalNegation("resistance");

  const totalWeight = allSelectedItems
    .reduce((acc, item) => acc + parseFloat(item.weight || 0), 0)
    .toFixed(2);

  const renderInfoList = (negationData, type) => (
    <ul className={`${type}-neg-items`}>
      <h3>{type.charAt(0).toUpperCase() + type.slice(1)} Negation</h3>
      {Object.entries(negationTypes[type]).map(([key, label]) => (
        <li key={key} className="dam-res-item">
          {label}:{" "}
          <span className="negation-values">
            {negationData[key].toFixed(1)}
          </span>
        </li>
      ))}
      {type === "damage" && (
        <li key="totalPhysical" className="dam-res-item">
          Total Physical:{" "}
          <span className="negation-values">{negationData.totalPhysical}</span>
        </li>
      )}
    </ul>
  );

  return (
    <div className="build-sidebar-container">
      <div className="dam-res-list">
        {renderInfoList(totalDamageNegation, "damage")}
        {renderInfoList(totalResistanceNegation, "resistance")}
      </div>
      <div className="total-weight-display">Weight: {totalWeight}</div>
    </div>
  );
}
