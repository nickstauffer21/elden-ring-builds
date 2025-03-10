import React, { useContext } from "react";
import { DataContext } from "../../Data/DataProvider";

export default function Enemies() {
  const { enemies, bosses } = useContext(DataContext);
  const allEnemiesObj = [...enemies, ...bosses];
  const sortedEnemies = allEnemiesObj.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  const groupEnemies = sortedEnemies.reduce((acc, enemy) => {
    const firstLetter = enemy.name[0].toUpperCase();

    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(enemy);
    return acc;
  }, {});

  console.log(sortedEnemies);

  return (
    <div>
      {Object.entries(groupEnemies)
        .sort(([letterA], letterB) => letterA.localeCompare(letterB))
        .map(([letter, enemies]) => (
          <div key={letter}>
            <h2>{letter}</h2>
            <div>
              <ul>
                {enemies
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((enemy, id) => (
                    <li key={id}>{enemy.name}</li>
                  ))}
              </ul>
            </div>
          </div>
        ))}
    </div>
  );
}
