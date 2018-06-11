import React, { Component } from 'react';
import {Grid, Row, Col, Navbar, Nav, NavItem, MenuItem, NavDropdown} from 'react-bootstrap';

class NavBar extends Component {
  handleSelect(eventKey) { //switch to handle events
    switch(eventKey) {
      case 3.1:
        var win = window.open("https://nickyhuynh.com", '_blank');
        win.focus();
        break;
      case 3.2:
        var win = window.open("https://s3.amazonaws.com/nickyweb/images/Nicky_Huynh.pdf", '_blank');
        win.focus();
        break;
      case 3.3:
        var win = window.open("https://github.com/nickyhuynh", '_blank');
        win.focus();
        break;
      case 3.4:
        var win = window.open("https://linkedin.com/in/nickyhuynh", '_blank');
        win.focus();
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <Navbar inverse collapseOnSelect onSelect={k => this.handleSelect(k)}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#brand">AppSheet Challenge</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavDropdown eventKey={3} title="Learn More!" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Website</MenuItem>
              <MenuItem eventKey={3.2}>Resume</MenuItem>
              <MenuItem eventKey={3.3}>GitHub</MenuItem>
              <MenuItem eventKey={3.4}>LinkedIn</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
