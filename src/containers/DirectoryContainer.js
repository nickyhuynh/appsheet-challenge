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
  }

  render() {
    return (
      <DirectoryEntries directoryIds={this.state.people}/>
    )
  }
}

export default DirectoryContainer;
