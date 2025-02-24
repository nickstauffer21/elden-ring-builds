import React, { useContext, useState } from "react";
import "./Builds.css";
import { DataContext } from "../../Components/WeaponsComp/DataProvider";
import { BuildStateContext } from "./BuildStateProvider";
import BuildSelector from "./BuildSelector";
import BuildSidebar from "./BuildSidebar";
import SaveBuildModal from "./SaveBuildModal";

export default function Builds() {
  const id = "0";
  const [saveBuild, setSaveBuild] = useState(false);
  const [saveName, setSaveName] = useState("");
  const { weapons, armor, talismans } = useContext(DataContext);
  const { buildState, setBuildState, saveBuilds, setSavedBuilds } =
    useContext(BuildStateContext);

  const helmets = armor.filter((item) => item.type === "helm");
  const chest = armor.filter((item) => item.type === "chest armor");
  const gauntlets = armor.filter((item) => item.type === "gauntlets");
  const greaves = armor.filter((item) => item.type === "leg armor");

  const handleSelectedArmor = (type, id) => {
    setBuildState((prev) => ({
      ...prev,
      armor: { ...prev.armor, [type]: id },
    }));
  };

  const handleSelectedWeapon = (slot, id) => {
    setBuildState((prev) => ({
      ...prev,
      weapons: { ...prev.weapons, [slot]: id },
    }));
  };

  const handleSelectedTalisman = (slot, id) => {
    setBuildState((prev) => ({
      ...prev,
      talismans: { ...prev.talismans, [slot]: id },
    }));
  };

  const renderSelectedArmor = () => {
    const armorTypes = [
      { type: "helmet", items: helmets },
      { type: "chest", items: chest },
      { type: "gauntlets", items: gauntlets },
      { type: "greaves", items: greaves },
    ];
    return armorTypes.map(({ type, items }) => (
      <BuildSelector
        key={type}
        items={items}
        onSelect={(id) => handleSelectedArmor(type, id)}
        selectedItemId={buildState.armor[type]}
      />
    ));
  };

  const renderSelectedWeapon = () => {
    return Object.keys(buildState.weapons).map((slot) => (
      <BuildSelector
        key={slot}
        items={weapons}
        onSelect={(id) => handleSelectedWeapon(slot, id)}
        selectedItemId={buildState.weapons[slot]}
      />
    ));
  };

  const renderSelectedTalisman = () => {
    return Object.keys(buildState.talismans).map((slot) => (
      <BuildSelector
        key={slot}
        items={talismans}
        onSelect={(id) => handleSelectedTalisman(slot, id)}
        selectedItemId={buildState.talismans[slot]}
      />
    ));
  };

  const setCurrentBuild = (saveName) => {
    const newBuild = {
      name: saveName, // Add the save name to the build object
      armor: buildState.armor,
      weapons: buildState.weapons,
      talismans: buildState.talismans,
    };
    setSavedBuilds((prev) => [...prev, newBuild]); // Save the build with the name
  };
  const wipeBuilds = () => {
    setSavedBuilds([]);
  };

  const handleCurrentSave = () => {
    setSaveBuild((prev) => !prev);
  };

  const handleSaveSubmission = (e) => {
    e.preventDefault();
    handleCurrentSave();
    setCurrentBuild(saveName);
    setSaveName(e);
  };

  return (
    <div>
      <div className="build-container">
        <BuildSidebar
          selectedHelmet={buildState.armor.helmet}
          selectedChest={buildState.armor.chest}
          selectedGauntlets={buildState.armor.gauntlets}
          selectedGreaves={buildState.armor.greaves}
          selectedTalismanId1={buildState.talismans.talisman1}
          selectedTalismanId2={buildState.talismans.talisman2}
          selectedTalismanId3={buildState.talismans.talisman3}
          selectedTalismanId4={buildState.talismans.talisman4}
          selectedWeaponId1={buildState.weapons.weapon1}
          selectedWeaponId2={buildState.weapons.weapon2}
          selectedWeaponId3={buildState.weapons.weapon3}
          selectedWeaponId4={buildState.weapons.weapon4}
        />
        <div className="item-container">
          <div className="item-display">
            <div className="weapon-display">{renderSelectedWeapon()}</div>
            <div className="armor-display">{renderSelectedArmor()}</div>
            <div className="talisman-display">{renderSelectedTalisman()}</div>
          </div>
        </div>
        <div className="save-button-cont">
          <button className="save-button" onClick={() => handleCurrentSave()}>
            Save
          </button>
          <button className="save-button" onClick={wipeBuilds}>
            Remove All
          </button>
        </div>
        {saveBuild && (
          <div className="save-modal-overlay">
            <div className="save-modal">
              <SaveBuildModal
                handleCurrentSave={handleCurrentSave}
                setCurrentBuild={setCurrentBuild}
                handleSaveSubmission={handleSaveSubmission}
                saveName={saveName}
                setSaveName={setSaveName}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
