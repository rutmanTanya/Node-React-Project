import React from "react";
import { useLocation } from "react-router-dom";
import "../assets/styles/SinglePost.css";

function SinglePost() {
  const location = useLocation();
  //get post data from MainPage
  const post = location.state?.post;
  console.log(post);


  return (
    <section className="post main">
      <div className="container">
        <div className="single-post">
          <h1 className="post-title">{post.title}</h1>
          <div className="single-post-container">
            <img src={post.image} alt={post.title} className="post-image" />
            <p className="post-content">{post.content}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SinglePost;
