import React, { useState } from "react";
import Dropdown from "../../Components/Reusable/Dropdown";
import "./Builds.css";
import ItemSelector from "../../Components/Reusable/ItemSelector";
import SearchBar from "../../Components/Reusable/Search";

export default function BuildSelector({
  items,
  onSelect,
  title,
  selectedItemId,
}) {
  const [searchItem, setSearchItem] = useState("");
  const selectedItem = items.find((item) => item.id === selectedItemId) || null;

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchItem.toLowerCase())
  );
  const handleSelectionChange = (item) => {
    onSelect(item.id);
    setSearchItem("");
  };

  const clearSelection = () => {
    onSelect(null);
  };

  return (
    <div>
      <div className="item-boxes">
        <ItemSelector
          title={title}
          item={selectedItem}
          renderItemPreview={(item) => (
            <>
              {item?.image ? (
                <img src={item.image} className="item-image" alt={item.name} />
              ) : (
                <p className="image-none-tag">None</p>
              )}
            </>
          )}
        />

        <SearchBar
          data={filteredItems}
          setSelectedItem={handleSelectionChange}
          onSearchChange={setSearchItem}
          type={title}
        />
        <button
          className="clear-selection-button"
          onClick={() => clearSelection()}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
