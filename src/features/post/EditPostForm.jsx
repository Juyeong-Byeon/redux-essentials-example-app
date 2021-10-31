import React, { useState } from "react";
import { asyncPostAdd, postUpdated, selectPostById } from "./postSlice";
import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom";

export default function EditPostForm({ match }) {
  const { postId } = match.params;
  const post = useSelector(selectPostById(postId));
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const onChangeTitle = (e) => setTitle(e.currentTarget.value);
  const onChangeContent = (e) => setContent(e.currentTarget.value);

  const onClickSaveChange = () => {
    if (!title || !content) return;

    dispatch(
      asyncPostAdd({
        id: postId,
        title,
        content
      })
    );
    history.push(`/post/${postId}`);
  };

  if (!post) return <section>404 notfound</section>;

  return (
    <section>
      <article>
        <h2>edit post</h2>
        <form>
          <label htmlFor="title">title : </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={onChangeTitle}
          />
          <label htmlFor="content">content : </label>
          <textarea
            name="content"
            id="content"
            cols="30"
            rows="10"
            value={content}
            onChange={onChangeContent}
          />
          <button type="button" onClick={onClickSaveChange}>
            save change
          </button>
        </form>
      </article>
    </section>
  );
}
