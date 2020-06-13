import React from "react";
import Store from "./Store";
import "./StoreList.css";

const StoreList = ({ storeList, onStoreClick }) => {
  let stores = storeList.map((store, index) => {
    return (
      <Store
        store={store}
        index={index}
        key={store.id}
        onStoreClick={onStoreClick}
      />
    );
  });

  const renderedContent =
    stores.length > 0 ? (
      stores
    ) : (
      <div className="intro">
        <span className="enter-zip">Enter zip code</span>
        <span className="find-stores">Find stores near you</span>
      </div>
    );
  return (
    <div className="stores-list-container">
      <div className="stores-list">{renderedContent}</div>
    </div>
  );
};

export default StoreList;
