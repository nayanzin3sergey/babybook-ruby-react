import React from 'react';
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";


function PostItem(props) {
  return (
    <li className="single-post">
      <Link className="user" to={`/users/${props.post.author_id}`}><i className="fa fa-user-circle" aria-hidden="true"/>{props.post.author_name}</Link>
      <ul>{props.post.body}</ul>
        <img src={props.post.image_url}/>
      <br/>
      <label className="like-comment-share">
        <i className="fa fa-thumbs-o-up" aria-hidden="true">Like</i>
        <i className="fa fa-commenting-o" aria-hidden="true">Comment</i>
        <i className="fa fa-share" aria-hidden="true">Share</i>
      </label>
    </li>
  );
}

export default withRouter((PostItem));
