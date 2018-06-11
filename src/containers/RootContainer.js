import React, { Component } from 'react';
import NavContainer from './NavContainer';
import DirectoryContainer from './DirectoryContainer';

class RootContainer extends Component {
  render() {
    return (
      <div>
        <NavContainer/>
        <DirectoryContainer/>
      </div>
    );
  }
}

export default RootContainer;
