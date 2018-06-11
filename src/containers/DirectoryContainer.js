import React, { Component } from 'react';
import DirectoryEntries from './DirectoryEntries';

class DirectoryContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {peopleIds: []};
    this.ids = [];
  }

  componentDidMount() {
    this.getIds("");
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
