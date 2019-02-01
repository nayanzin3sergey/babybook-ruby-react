import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import PostItem from './post_item';
import { fetchPosts, fetchPost } from '../../actions/post_actions';
import { fetchUsers } from '../../actions/user_actions';
import { logout } from '../../actions/session_actions';
import PostForm from './post_form';
import LeftSidebar from './left_sidebar';
import RightSidebar from './right_sidebar';
import { clearSearchResults } from '../../actions/search_actions';
import SearchBarContainer from '../profile/search_bar_container';

class PostContainer extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.searchResults.length > 0) {
      this.props.clearSearchResults();
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchPosts();
  }

  render() {
    const currentUser = this.props.currentUser;
    const reversePosts = this.props.posts.reverse();
    const posts = reversePosts.map(post => {
      return <PostItem key={post.id} post={post} />;
    });

    return (
        <div>
          <header className="xyz" onClick={this.handleClick}>
            <Link to="/"><p className="bb-logo">b</p></Link>
            <SearchBarContainer />
            <Link className="user-link" to={`/users/${this.props.currentUser.id}`}>
            <i className="fa fa-user-circle" aria-hidden="true"/>{this.props.currentUser.fullName}</Link>
            <button className="logout-button" onClick={this.props.logout}>Log Out</button>
          </header>

          <div className="MainPage-body">
            <main className="MainPage-content">
              <PostForm />
              <ul>{posts}</ul>
            </main>
            <nav className="MainPage-nav"><LeftSidebar currentUser={currentUser}/></nav>
            <aside className="MainPage-ads"><RightSidebar/></aside>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: Object.values(state.entities.posts),
    currentUser: state.entities.users[state.session.id]
  };
};

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  fetchPosts: () => dispatch(fetchPosts()),
  logout: () => dispatch(logout()),
  clearSearchResults: () => dispatch(clearSearchResults()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostContainer);
