import React, { Component } from 'react';
import DirectoryEntries from './DirectoryEntries';

class DirectoryContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {people: []};
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    fetch('https://appsheettest1.azurewebsites.net/sample/list', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }}
    ).then(function(res) {
      return res.json();
    })
    .then(function(resJson) {
      this.setState({ people: resJson["result"] })
      console.log(this.state.people);
    }.bind(this));
  }

  render() {
    return (
      <DirectoryEntries directoryIds={this.state.people}/>
    )
  }
}

export default DirectoryContainer;
