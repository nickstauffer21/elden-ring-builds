import React, { useState, useEffect } from "react";
import "../../pages/Builds/Builds.css";

export default function ItemSelector({ title, item, renderItemPreview }) {
  const [selectedInfo, setSelectedInfo] = useState(false);

  return (
    <div className="item-selector">
      <h3 className="item-title">{title}</h3>
      <div className="item-box" onClick={() => setSelectedInfo(item)}>
        {renderItemPreview(item)}
        {item && (
          <div className="item-more-info-overlay">
            <p className="item-more-info">More Info</p>
          </div>
        )}
      </div>
      {selectedInfo && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>{selectedInfo.name}</h4>
            {selectedInfo.effect && <p>{selectedInfo.effect}</p>}
            {selectedInfo["how to acquire"] && (
              <p>How to obtain: {selectedInfo["how to acquire"]}</p>
            )}

            <p>{selectedInfo.description}</p>
            <button onClick={() => setSelectedInfo(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
