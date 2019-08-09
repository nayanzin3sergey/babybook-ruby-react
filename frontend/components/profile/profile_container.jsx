import React from 'react';
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { fetchPosts, fetchPost } from '../../actions/post_actions';
import { fetchUser, fetchUsers } from '../../actions/user_actions';
import { logout } from '../../actions/session_actions';
import PostForm from '../post/post_form';
import PostItem from '../post/post_item';
// import { showDropdown, hideDropdown } from '../../actions/dropdown_actions';
import { clearSearchResults } from '../../actions/search_actions';
import SearchBarContainer from './search_bar_container';
// import NavBar from '../nav/nav_bar';

class ProfileContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = { shownPosts: 3 };
    // this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    // this.clearSearchResults = this.clearSearchResults.bind(this);
  }

  // toggleDropdown(component) {
  //   return () => {
  //     if (this.props.dropdownDisplayed) {
  //       this.props.hideDropdown();
  //     } else {
  //       this.props.showDropdown(component);
  //     }
  //   };
  // }

  handleClick() {
    if (this.props.searchResults.length > 0) {
      this.props.clearSearchResults();
    }
  }

  handleScroll(e) {
    const observer = new IntersectionObserver(
          checkPoint => {
            if ( checkPoint[0].intersectionRatio <= 0) return;
            this.setState( prev => ({shownPosts: prev.shownPosts+3}));
          }
        );
    observer.observe(document.querySelector('.sentinels-1'));
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.handleClick();
    this.handleScroll();
    this.props.fetchUser(this.props.match.params.userId);
    this.props.fetchPosts(this.props.match.params.userId);
  }

  render() {
    const personalPosts = this.props.posts.filter( post => post.author_id === this.props.user.id)
    const userPosts = personalPosts.slice(0,this.state.shownPosts).map(post => {
        return <PostItem key={post.id} post={post} />;
    });
    const userPhotos = personalPosts.slice(0,9).map(post => {
        return <div key={post.id} className="single-photo"><img src={post.image_url}/></div>;
    });
    return (
      <div>
        <header className="nav-container" onClick={this.handleClick}>
          <div className="nav-bar">
              <div className="nav-left">
                <Link to="/"><p className="bb-logo">b</p></Link>
                <SearchBarContainer />
              </div>
              <div className="nav-right">
                <div className="user-link2">
                  <i className="fa fa-user-circle" aria-hidden="true"/>
                  <Link to={`/users/${this.props.currentUser.id}`}><p className="nav-text">{this.props.currentUser.fullName}</p></Link>
                </div>
                <Link to="/"><p className="nav-text">Home</p></Link>
                <Link to="/"><p className="nav-text">Find Friends</p></Link>
                <Link to="/"><p className="nav-text">Create</p></Link>
                <div className="nav-icon friends"></div>
                <div className="nav-icon messages"></div>
                <div className="nav-icon alert"></div>
                <div className="nav-icon questions"></div>
                <button className="logout-button" onClick={this.props.logout}>Log Out</button>
              </div>
          </div>
        </header>

        <div className="profile-image">
          <img src={this.props.user.cover_photo_url}/>
          <img src={this.props.user.profile_photo_url}/>
          <div className="profile-name"><li>{this.props.user.fullName}</li></div>
          <div className="profile-navbar">
            <li>Timeline</li>
            <li>About</li>
            <li>Friends</li>
            <li>Photos</li>
            <li>More</li>
          </div>
        </div>

        <div className="profile-body">
          <div className="profile-info">
            <div className="user-intro">
              <div className="profile-icon globe"><p>Intro</p></div>
              <p>I just find myself happy with the simple things. Appreciating the blessings god gave me.</p>
              <p><strong>User Name:</strong>&nbsp;{this.props.user.fullName}</p>
              <p><strong>Email:</strong>&nbsp;{this.props.user.email}</p>
              <p><strong>Hometown:</strong>&nbsp;{this.props.user.hometown || "San Francisco"}</p>
              <p><strong>Workplace:</strong>&nbsp;{this.props.user.workplace || "Fortune 500 "}</p>
              <p><strong>School:</strong>&nbsp;{this.props.user.school || "Stanford University"}</p>
              <p><strong>Gender:</strong>&nbsp;{this.props.user.gender || "Unspecified"}</p>
            </div>
            <div className="user-intro">
              <div className="profile-icon photo"><p>Photos</p></div>
              <div className="album">
                {userPhotos}
              </div>
            </div>
          </div>
          <div className="profile-content">
            <PostForm />
            <ul>{userPosts}</ul>
            <span className="sentinels-1">.</span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const user = state.entities.users[ownProps.match.params.userId] || {"last_name": "lest", posts:[]};
  const dropdownDisplayed = (
    state.ui.dropdown.displayed
  );
  return {
    user,
    currentUser: state.entities.users[state.session.id],
    posts: Object.values(state.entities.posts).reverse(),
    searchResults: state.ui.searchResults,
    users: state.entities.users,
    dropdownDisplayed,
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchUser: userId => dispatch(fetchUser(userId)),
  // fetchUsers: () => dispatch(fetchUsers()),
  fetchPosts: userId => dispatch(fetchPosts(userId)),
  clearSearchResults: () => dispatch(clearSearchResults()),
  // showDropdown: component => dispatch(showDropdown(component)),
  // hideDropdown: () => dispatch(hideDropdown()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);
