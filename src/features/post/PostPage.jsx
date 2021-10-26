import { Link } from "react-router-dom";
import PostAuthor from "../user/PostAuthor";
import React from "react";
import ReactionButtons from './ReactionButtons';
import { useSelector } from "react-redux";

export default function PostPage({ match }) {
  const { postId } = match.params;
  const post = useSelector(({ posts }) =>
    posts.find((post) => post.id === postId)
  );

  if (!post) return <section>404 not found</section>;

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <PostAuthor userId={post.userId} />
        <p className="post-content">{post.content}</p>
      </article>
      <ReactionButtons post={post}/>
      <Link to={`/editpost/${postId}`} className="button">
        edit
      </Link>
    </section>
  );
}
