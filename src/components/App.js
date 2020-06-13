import React from "react";
import GoogleMapDemo from "./GoogleMapDemo";
import "./App.css";
import SearchBar from "./SearchBar";
import StoreList from "./StoreList";
import Yelp from "../api/Yelp";



class App extends React.Component {
  state = { storeList: [], selectedMarkerIndex: null };

  onFormSubmit = (term = "pizza", location = "chicago") => {
    Yelp.get("/v3/businesses/search", {
      params: {
        term,
        location,
      },
    }).then((response) => {
      this.setState(() => ({
        storeList: response.data.businesses,
        selectedMarkerIndex: null,
      }));
    });
  };

  onStoreClick = (index) => {
    console.log(index);
    this.setState(() => ({ selectedMarkerIndex: index }));
  };

  render() {
    return (
      <div>
        <div className="title">Store Locator</div>
        <SearchBar onFormSubmit={this.onFormSubmit} />
        <GoogleMapDemo
          storeList={this.state.storeList}
          selectedMarkerIndex={this.state.selectedMarkerIndex}
        />
        <StoreList
          storeList={this.state.storeList}
          onStoreClick={this.onStoreClick}
        />
      </div>
    );
  }
}

export default App;
