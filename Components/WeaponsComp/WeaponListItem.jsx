import React from "react";
import "../../pages/Weapons/Weapons.css";

export default function WeaponListItem({ weapon, onSelect }) {
  if (!weapon || !weapon.name) {
    return <div>Weapon data is missing or incomplete.</div>;
  }
  return (
    <div>
      <p onClick={() => onSelect(weapon)} className="selected-weapon-choice">
        {weapon.name}
      </p>
    </div>
  );
}
