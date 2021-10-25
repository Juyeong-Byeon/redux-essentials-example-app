import { Link } from "react-router-dom";
import PostAuthor from "../user/PostAuthor";
import React from "react";
import { useSelector } from "react-redux";

export default function PostList() {
  const posts = useSelector(({ posts }) => posts);

  const renderPost = posts.map((post) => (
    <article className="post-excerpt" key={post.key}>
      <h2>{post.title}</h2>
      <PostAuthor userId={post.userId} />
      <p>{post.content.substring(0, 100)}</p>
      <Link className="button muted-button" to={`post/${post.id}`}>
        View post
      </Link>
    </article>
  ));

  return <section className="posts-list">{renderPost}</section>;
}
