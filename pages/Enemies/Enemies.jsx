import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../Data/DataProvider";
import EnemiesModal from "./EnemiesModal";
import "./Enemies.css";

export default function Enemies() {
  const { enemies, bosses } = useContext(DataContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEnemy, setSelectedEnemy] = useState("");

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

  const handleSelectEnemy = (enemy) => {
    setSelectedEnemy(enemy);
  };

  console.log(sortedEnemies);

  return (
    <div className="container">
      <div className="enemies-container">
        {Object.entries(groupEnemies)
          .sort(([letterA], [letterB]) => letterA.localeCompare(letterB))
          .map(([letter, enemies]) => (
            <div key={letter} className="enemies-list-content">
              <h2>{letter}</h2>
              <div>
                <ul>
                  {enemies
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((enemy, id) => (
                      <li
                        key={id}
                        className="enemy-item"
                        onClick={() => handleSelectEnemy(enemy)}
                      >
                        {enemy.name}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
      </div>
      <EnemiesModal selectedEnemy={selectedEnemy} />
    </div>
  );
}
