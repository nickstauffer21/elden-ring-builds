import React, { useContext, useState } from "react";
import { BuildStateContext } from "./BuildStateProvider";
import { DataContext } from "../../Components/WeaponsComp/DataProvider";
import "./SavedBuilds.css";

export default function SavedBuilds() {
  const {
    weapons: weaponData,
    armor: armorData,
    talismans: talismanData,
  } = useContext(DataContext);
  const { savedBuilds, buildState } = useContext(BuildStateContext);

  const getItemDetails = (id, data) => {
    const item = data.find((item) => item.id === id);
    return item || { name: "none" };
  };

  return (
    <div className="saved-builds-container">
      {savedBuilds.length === 0 ? (
        <p>No builds</p>
      ) : (
        savedBuilds.map((build, index) => (
          <div key={index}>
            <h3>Build {index + 1}</h3>
            <div className="build-item-container">
              <h4>Armor</h4>
              {Object.entries(build.armor).map(([type, id]) => {
                const details = getItemDetails(id, armorData);
                return (
                  <div key={type}>
                    <p>{details.name}</p>
                  </div>
                );
              })}
            </div>
            <div className="build-item-container">
              <h3>Weapons</h3>
              {Object.entries(build.weapons).map(([slot, id]) => {
                const details = getItemDetails(id, weaponData);
                return (
                  <div key={slot} className="saved-item">
                    <p>{details.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
