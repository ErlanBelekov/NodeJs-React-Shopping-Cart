import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  Button,
  Nav,
  NavbarBrand,
  NavbarToggler,
  NavLink,
  NavItem,
  Container
} from 'reactstrap';
import store from '../store';
import {toggleModal} from '../actions/modal_actions';

export function callToToggleModal() {
  store.dispatch(toggleModal());
}

class AppNavbar extends Component {
  state = {
    isOpen: false
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render(){
    return(
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">Shop Dashboard</NavbarBrand>
            <NavbarToggler onClick={this.toggle}/>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto">
                <NavItem>
                  <NavLink href="https://github.com/ErlanBelekov/NodeJs-React-Shopping-Cart">
                    Github
                  </NavLink>
                </NavItem>
                <NavItem>
                  <Button
                    color="dark"
                    style={{margin:0}}
                    onClick={callToToggleModal}
                  >
                    Add item
                  </Button>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;
