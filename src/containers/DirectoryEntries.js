import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import DirectoryEntry from '../components/DirectoryEntry';
import {trim} from '../Helpers';

class DirectoryEntries extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {people: []}

    this.colStyle = { //styling for columns and rows
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

  /*
    Since the parent container will update whenever it finishes querying for all the peopleIds, when it updates
    clear whatever is inside at the moment and then populate it.
  */
  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    this.setState({people: []});
    this.getPeople();
  }

  /*
    regexp to handle valid phone numbers

  */
  getPeople() {
    var rgx = new RegExp(/^[1-9]\d{2}-\d{3}-\d{4}$/);
    var people = [];
    /*
      always specify header to make sure you know your response type and so server knows what you're sending
      map function to every id in array of peopleIds
    */
    this.props.peopleIds.map(function(id, i) {
      fetch(`http://appsheettest1.azurewebsites.net/sample/detail/${id}`, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }}
      ).then(function(res) {
        if(res.status != 200) { //normally i would have another check here in case it was a valid id but returns nothing, but need documentation on that
          return null;
        }
        return res.json();
      })
      .then(function(resJson) {
        /*
          checks against regex as well as bad response from server
        */
        if(resJson == null || !rgx.test(trim(resJson["number"]))) {
          return null;
        }

        /*
          push result into this temporary array
          and sort it, while keeping the size minimal by making sure you only ever have five or less entries
        */
        people.push(resJson);
        people.sort(function(a,b) {return a["age"] - b["age"];})

        if(people.length > 5) {
          people = people.slice(0, 5);
        }

        //when your promise returns and you're at the last index, you can finally set state and re-render
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
