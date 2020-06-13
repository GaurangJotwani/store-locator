import React from "react";
import "./Store.css";

const Store = ({ store, index, onStoreClick }) => {
  return (
    <div
      className="store-container"
      onClick={(event) => {
        onStoreClick(index+1, event);
      }}
    >
      <div className="store-container-background">
        <div className="store-info-container">
          <div className="store-address">
            <span style={{ fontWeight: "bold", color: "#514C0D" }}>
              {" "}
              {store.name
                .split(" ")
                .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
                .join(" ")}
            </span>
            <span> {store.location.address1}</span>
          </div>
          <div className="store-phone-number">{store.phone}</div>
        </div>
        <div className="store-number-container">
          <div className="store-number">{index + 1}</div>
        </div>
      </div>
    </div>
  );
};

export default Store;
