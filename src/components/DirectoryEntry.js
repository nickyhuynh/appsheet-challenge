import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';
import {trim} from '../Helpers';

class DirectoryEntry extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {person: {}}
  }

  componentDidMount() {
    this.getPerson();
  }

  getPerson() {
      fetch(`http://appsheettest1.azurewebsites.net/sample/detail/${this.props.userId}`, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }}
      ).then(function(res) {
        return res.json();
      })
      .then(function(resJson) {
        this.setState({ person: resJson })
      }.bind(this));
  }

  render() {
    var rgx = new RegExp(/^[1-9]\d{2}-\d{3}-\d{4}$/);
    if(!rgx.test(trim(this.state.person["number"]))) {
      return null;
    }
    return (
      <Row>
        <Col md={1}>{this.state.person["name"]}</Col>
        <Col md={1}>{this.state.person["age"]}</Col>
        <Col md={3}>{this.state.person["number"]}</Col>
        <Col md={6}>{this.state.person["bio"]}</Col>
      </Row>
    );
  }
}

export default DirectoryEntry;
