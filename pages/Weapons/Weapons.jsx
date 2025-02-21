import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import "./Weapons.css";
import "../../Components/WeaponsComp/weaponsDetail.css";
import WeaponDetails from "../../Components/WeaponsComp/WeaponDetails";
import { DataContext } from "../../Components/WeaponsComp/DataProvider";
import useLocalStorage from "../../Components/useLocalStorage";
import SearchBar from "../../Components/Reusable/Search";

export default function Weapons() {
  const { weapons } = useContext(DataContext);

  const [selectedWeapon, setSelectedWeapon] = useLocalStorage(
    "selectedWeapon",
    weapons[0]
  );
  const [searchItem, setSearchItem] = useState("");

  const rollRandomWeapon = useCallback(() => {
    if (weapons.length > 0) {
      const randomIndex = Math.floor(Math.random() * weapons.length);
      setSelectedWeapon(weapons[randomIndex]);
    }
  }, [weapons]);

  const weaponsList = useMemo(() => {
    return weapons.filter((weapon) =>
      weapon.name.toLowerCase().includes(searchItem.toLowerCase())
    );
  }, [weapons, searchItem]);

  useEffect(() => {
    if (weapons.length > 0 && !selectedWeapon?.name) {
      setSelectedWeapon(weapons[0]);
    }
  }, [weapons, selectedWeapon]);

  return (
    <div className="container">
      {weapons.length > 0 ? (
        <>
          <button onClick={rollRandomWeapon} className="random-weapon-button">
            Get random weapon
          </button>
          <div className="weapons-container">
            <div className="weapons-list-display">
              <SearchBar
                data={weaponsList}
                onSearchChange={setSearchItem}
                setSelectedItem={setSelectedWeapon}
                type="weapons"
              />
            </div>
            <WeaponDetails
              selectedWeapon={selectedWeapon}
              setSelectedWeapon={setSelectedWeapon}
              rollRandomWeapon={rollRandomWeapon}
            />
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
