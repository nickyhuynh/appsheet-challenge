import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';

class DirectoryEntry extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.colStyle = { //styling for columns and rows
      padding: '1rem',
      backgroundColor: '#33b5e5',
      border: '2px solid #fff',
      color: '#fff',
      textAlign: 'center'
    }

    this.rowStyle = {
      margin: '1rem',
    }
  }

  render() {
    return (
      <Row style={this.rowStyle}>
        <Col style={this.colStyle} md={1}>{this.props.person["name"]}</Col>
        <Col style={this.colStyle} md={1}>{this.props.person["age"]}</Col>
        <Col style={this.colStyle} md={3}>{this.props.person["number"]}</Col>
        <Col style={this.colStyle} md={6}>{this.props.person["bio"]}</Col>
      </Row>
    );
  }
}

export default DirectoryEntry;
