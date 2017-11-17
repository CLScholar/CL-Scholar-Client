import React, {Component} from 'react';
import {InputGroup, InputGroupButton, Input, Container} from 'reactstrap';
import { Nav, NavItem, NavLink } from 'reactstrap';
import './search-bar.css';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      category: 1
    }
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.checkKey = this.checkKey.bind(this);
  }

  componentWillMount() {
    if(this.props.value) {
      this.setState({
        value: this.props.value,
        category: this.props.category
      });
    }
  }

  // Binding input field
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  // Pressing enter triggers search
  checkKey(e) {
    if (e.key === 'Enter') {
      this.submit();
    }
  }

  submit() {
    this.props.searchTerm({
      search: this.state.value,
      category: this.state.category
    });
  }

  render() {
    return (
      <Container className="search-bar">
        <Nav className="pb-2">
          <NavItem>
            <NavLink
              className={this.state.category === 1 ? "active" : null}
              href="#"
              onClick={() => this.setState({category: 1})}>
              All Categories
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={this.state.category === 2 ? "active" : null}
              href="#"
              onClick={() => this.setState({category: 2})}>
              Paper Title
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={this.state.category === 3 ? "active" : null}
              href="#"
              onClick={() => this.setState({category: 3})}>
              Author
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={this.state.category === 4 ? "active" : null}
              href="#"
              onClick={() => this.setState({category: 4})}>
              Conference
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={this.state.category === 4 ? "active" : null}
              href="#"
              onClick={() => this.setState({category: 4})}>
              Affiliation
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={this.state.category === 4 ? "active" : null}
              href="#"
              onClick={() => this.setState({category: 4})}>
              Topic
            </NavLink>
          </NavItem>
        </Nav>
        <InputGroup>
          <Input
            placeholder="Paper/Author/Conference Name"
            value={this.state.value}
            onChange={this.handleChange}
            onKeyDown={this.checkKey}
          />
          <InputGroupButton onClick={this.submit} color="primary">Search</InputGroupButton>
        </InputGroup>
      </Container>
    );
  }
}
