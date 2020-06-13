import React from "react";
import "./SearchBar.css";

class SearchBar extends React.Component {
  state = { term: "pizza", location: "los angeles" };

  handleLocationInputChange = (event) => {
    let location = event.target.value;
    this.setState(() => ({ location }));
  };
  handleTermInputChange = (event) => {
    let term = event.target.value;
    this.setState(() => ({ term }));
  };
  onKeyUp = (e) => {
    if (e.key === "Enter") {
      this.props.onFormSubmit(this.state.term, this.state.location);
    }
  };

  render() {
    return (
      <div className="search-bar">
        <div className="search-container">
          <div className="search">
            <input
              type="text"
              value={this.state.location}
              placeholder="Enter Location"
              id="location"
              onChange={this.handleLocationInputChange}
              onKeyUp={this.onKeyUp}
            />
          </div>
        </div>
        <div className="search-container-term">
          <div className="search">
            <input
              type="text"
              value={this.state.term}
              placeholder="Search Something!"
              id="term"
              onChange={this.handleTermInputChange}
              onKeyUp={this.onKeyUp}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
