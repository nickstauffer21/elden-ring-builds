import React, { createContext, useEffect, useState } from "react";

export const DataContext = createContext({
  weapons: [],
  armor: [],
  talismans: [],
});

export default function WeaponsProvider({ children }) {
  const [weapons, setWeapons] = useState([]);
  const [armor, setArmor] = useState([]);
  const [talismans, setTalismans] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const weapons = await import("../../Data/WeaponData/weapons.json");
        setWeapons(weapons.default);
        const armor = await import("../../Data/ArmorData/armor.json");
        setArmor(armor.default);
        const talismans = await import(
          "../../Data/TalismanData/talismans.json"
        );
        setTalismans(talismans.default);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  if (!armor.length) {
    return <div>Loading...</div>;
  }

  return (
    <DataContext.Provider value={{ weapons, armor, talismans }}>
      {children}
    </DataContext.Provider>
  );
}
