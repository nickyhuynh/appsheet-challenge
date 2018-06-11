import React, { Component } from 'react';
import DirectoryEntries from './DirectoryEntries';

class DirectoryContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {peopleIds: []};
    this.ids = [];
  }

  componentDidMount() {
    this.getIds(""); //pass in optional empty token
  }

  getIds(token) {
    fetch(`https://appsheettest1.azurewebsites.net/sample/list?token=${token}`, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }}
    ).then(function(res) {
      return res.json();
    })
    .then(function(resJson) {
      /*
        Stores result in itself over and over again until no more tokens
        Possibility of tokens creating a loop, but there should be a reasonable expectation for result from backend
        When token is null, you've traversed it all, then you want to setState and re-render children DirectoryEntries
      */
      this.ids = this.ids.concat(resJson["result"]);
      if(resJson["token"] != null) {
        this.getIds(resJson["token"])
      } else {
        this.setState({peopleIds: this.ids})
      }
    }.bind(this));
  }

  render() {
    return (
      <DirectoryEntries peopleIds={this.state.peopleIds}/>
    )
  }
}

export default DirectoryContainer;
