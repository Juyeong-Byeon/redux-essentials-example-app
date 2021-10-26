import { Link } from "react-router-dom";
import PostAuthor from "../user/PostAuthor";
import React from "react";
import ReactionButtons from './ReactionButtons';
import TimeAgo from './TimeAgo';
import { useSelector } from "react-redux";

export default function PostList() {
  const posts = useSelector(({ posts }) => posts);

  const sortedPosts=posts.slice().sort((a,b)=>b.date.localeCompare(a.date));

  const renderPost = sortedPosts.map((post) => (
    <article className="post-excerpt" key={post.key}>
      <h2>{post.title}</h2>
      <PostAuthor userId={post.userId} />
      <TimeAgo timeStamp={post.date}/>
      <p>{post.content.substring(0, 100)}</p>
      <Link className="button muted-button" to={`post/${post.id}`}>
        View post
      </Link>
      <ReactionButtons post={post}/>
    </article>
  ));

  return <section className="posts-list">{renderPost}</section>;
}
