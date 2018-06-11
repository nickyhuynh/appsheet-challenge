import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import DirectoryEntry from '../components/DirectoryEntry';
import {trim} from '../Helpers';

class DirectoryEntries extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {people: []}

    this.colStyle = {
      padding: '1rem',
      backgroundColor: '#7a8889',
      border: '2px solid #fff',
      color: '#fff',
      textAlign: 'center'
    }

    this.rowStyle = {
      margin: '1rem',
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    this.setState({people: []});
    this.getPeople();
  }

  getPeople() {
    var rgx = new RegExp(/^[1-9]\d{2}-\d{3}-\d{4}$/);
    var people = [];
    this.props.peopleIds.map(function(id, i) {
      fetch(`http://appsheettest1.azurewebsites.net/sample/detail/${id}`, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }}
      ).then(function(res) {
        if(res.status != 200) {
          return null;
        }
        return res.json();
      })
      .then(function(resJson) {
        if(resJson == null || !rgx.test(trim(resJson["number"]))) {
          return null;
        }

        people.push(resJson);
        people.sort(function(a,b) {return a["age"] - b["age"];})
        
        if(people.length > 5) {
          people = people.slice(0, 5);
        }

        if(i == this.props.peopleIds.length-1) {
          this.setState({people: people});
        }

      }.bind(this));
    }.bind(this));
  }

  render() {
    return (
      <Grid>
        <Row style={this.rowStyle}>
          <Col style={this.colStyle} md={1}>Name</Col>
          <Col style={this.colStyle} md={1}>Age</Col>
          <Col style={this.colStyle} md={3}>Number</Col>
          <Col style={this.colStyle} md={6}>Bio</Col>
        </Row>
        {this.state.people.map(function(person) {
          return <DirectoryEntry key={person["id"]} person={person}/>;
        })};
      </Grid>
    );
  }
}

export default DirectoryEntries;
