import React, { Component } from 'react';
import {Grid} from 'react-bootstrap';
import DirectoryEntry from '../components/DirectoryEntry';

class DirectoryEntries extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        {this.props.directoryIds.map(function(id) {
          return <div>{id}</div>;
        })};
      </div>
    );
  }
}

export default DirectoryEntries;
