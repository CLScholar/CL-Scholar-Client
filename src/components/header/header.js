import React, {Component} from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import './header.css';
import Logo from '../../assets/images/logo.png';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div className='header'>
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="/">
            <img alt="Logo" src={Logo}/>
          </NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="p-2" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/search">Search</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/components/">The Team</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/components/">Year Wise Stats</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/components/">Contact Us</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/components/">About Us</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}