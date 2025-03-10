import React, { useContext, createContext } from "react";
import { DataContext } from "../../Data/DataProvider";
import useLocalStorage from "../../Components/useLocalStorage";

export const BuildStateContext = createContext();

export default function BuildStateProvider({ children }) {
  const id = "0";
  const { armor } = useContext(DataContext);

  const helmets = armor.filter((item) => item.type === "helm");
  const chest = armor.filter((item) => item.type === "chest armor");
  const gauntlets = armor.filter((item) => item.type === "gauntlets");
  const greaves = armor.filter((item) => item.type === "leg armor");

  const [buildState, setBuildState] = useLocalStorage("buildstate", {
    armor: {
      helmet: helmets[0]?.id || "",
      chest: chest[0]?.id || "",
      gauntlets: gauntlets[0]?.id || "",
      greaves: greaves[0]?.id || "",
    },
    talismans: {
      talisman1: null,
      talisman2: null,
      talisman3: null,
      talisman4: null,
    },
    weapons: {
      weapon1: null,
      weapon2: null,
      weapon3: null,
      weapon4: null,
    },
  });

  const [savedBuilds, setSavedBuilds] = useLocalStorage("savedBuilds", []);

  return (
    <BuildStateContext.Provider
      value={{ buildState, setBuildState, savedBuilds, setSavedBuilds }}
    >
      {children}
    </BuildStateContext.Provider>
  );
}
