import React, {Component} from 'react';
import {InputGroup, InputGroupButton, Input, Container} from 'reactstrap';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { withRouter } from 'react-router-dom'
import './search-bar.css';

class SearchBar extends Component {
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
    this.props.history.push({
      pathname: '/search',
      state: { value: this.state.value, category: this.state.category }
    })
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

export default withRouter(SearchBar);
