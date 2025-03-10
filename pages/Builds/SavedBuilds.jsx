import React, { useContext, useState } from "react";
import { BuildStateContext } from "./BuildStateProvider";
import { DataContext } from "../../Data/DataProvider";
import "./SavedBuilds.css";

export default function SavedBuilds() {
  const [isBuildSelected, setBuildIsSelected] = useState(true);
  const { savedBuilds, setSavedBuilds, buildState } =
    useContext(BuildStateContext);
  const {
    weapons: weaponData,
    armor: armorData,
    talismans: talismanData,
  } = useContext(DataContext);

  const getItemDetails = (id, data) => {
    const item = data.find((item) => item.id === id);
    return item || { name: "none" };
  };

  const handleRemoveBuild = (index) => {
    const updatedSavedBuilds = savedBuilds.filter((_, i) => i !== index);
    setSavedBuilds(updatedSavedBuilds);
  };

  return (
    <div className="saved-builds-container">
      {savedBuilds.length === 0 ? (
        <p>No builds</p>
      ) : (
        savedBuilds.map((build, index) => (
          <div key={index}>
            <div className="saved-builds-content">
              <h3 className="build-name">{build.name}</h3>
              <button
                onClick={() => handleRemoveBuild(index)}
                className="remove-save-btn"
              >
                Delete
              </button>
              <p>Num {index + 1}</p>
              {isBuildSelected ? (
                <>
                  <div className="build-item-container">
                    {Object.entries(build.armor).map(([type, id]) => {
                      const details = getItemDetails(id, armorData);
                      return (
                        <div key={type} className="saved-item">
                          {details.image && (
                            <img src={details.image} alt={details.name} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="build-item-container">
                    {Object.entries(build.weapons).map(([slot, id]) => {
                      const details = getItemDetails(id, weaponData);
                      return (
                        <div key={slot} className="saved-item">
                          {details.image && (
                            <img src={details.image} alt={details.name} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="build-item-container">
                    {Object.entries(build.talismans).map(([slot, id]) => {
                      const details = getItemDetails(id, talismanData);
                      return (
                        <div key={slot} className="saved-item">
                          {details.image && (
                            <img src={details.image} alt={details.name} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                "no"
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
