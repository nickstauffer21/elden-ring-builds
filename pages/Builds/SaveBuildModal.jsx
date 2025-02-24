import React, { useState } from "react";
import "./SavedBuilds.css";

export default function SaveBuildModal({
  handleCurrentSave,
  setCurrentBuild,
  handleSaveSubmission,
  saveName,
  setSaveName,
}) {
  return (
    <div className="save-submission-overlay">
      <div className="save-submission-content">
        <form>
          <h3>Modal</h3>
          <input
            type="text"
            placeholder="Enter save name"
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
          />
          <button type="submit" onClick={handleSaveSubmission}>
            SAve save
          </button>
          <button onClick={() => handleCurrentSave("")}>Cancel</button>
        </form>
      </div>
    </div>
  );
}
