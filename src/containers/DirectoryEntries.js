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
      <Grid>
        {this.props.directoryIds.map(function(id) {
          return <DirectoryEntry key={id} userId={id}/>;
        })};
      </Grid>
    );
  }
}

export default DirectoryEntries;
