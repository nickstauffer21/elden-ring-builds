import React, { useContext, useState } from "react";
import { DataContext } from "../../Data/DataProvider";
import "./Enemies.css";

export default function EnemiesModal({ selectedEnemy }) {
  const { enemies, bosses } = useContext(DataContext);
  console.log(selectedEnemy.name);
  const getEnemyData = Object.entries;
  return (
    <div className="modal-container">
      <h3>{selectedEnemy.name}</h3>
      <img
        src={selectedEnemy.image}
        alt={selectedEnemy.name}
        className="selected-enemy-img"
      />
      <p>{selectedEnemy.HP}</p>
    </div>
  );
}
