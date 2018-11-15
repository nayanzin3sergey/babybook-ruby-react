import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class SearchBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.state = {
      input: '',
      searchResults: this.props.searchResults
    };
  }

  handleSearch(e) {
    e.preventDefault();
    this.setState({ input: e.target.value }, () => {
      if (this.state.input.length > 0) {
        this.props.fetchSearchResults(this.state.input);
      }
    });
  }

  componentWillUpdate(nextProps) {
    if (this.state.searchResults.length !== nextProps.searchResults.length) {
      this.setState({ searchResults: nextProps.searchResults });
    }

    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.props.clearSearchResults();
      this.clearInput();
    }
  }

  clearInput() {
    this.setState({ input: '' });
  }

  render() {
    let searchResults;
    if (this.state.searchResults.length < 1) {
      searchResults = null;
    } else {
      const searchResultItems = this.state.searchResults.map(user => {
        return(
          <li className='search-result' key={user.id}>
            <Link to={`/users/${user.id}`} className='search-result-content'>
              <p>{user.first_name} {user.last_name}</p>
            </Link>
          </li>
        );
      });

      searchResults = (
        <ul className='search-results content-item'>
          {searchResultItems}
        </ul>
      );
    }
        // <div className='nav-search-wrapper'>
    return (
      <div>
        <div className='search-bar'>
          <input
            onChange={this.handleSearch}
            type='text'
            placeholder='Search...'
            value={this.state.input}
          />
        </div>
        {searchResults}
      </div>
    );
  }
}

export default withRouter(SearchBarComponent);