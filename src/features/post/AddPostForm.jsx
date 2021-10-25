import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { postAdded } from "./postSlice";

export default function AddPostForm() {
  const [title, setTitle] = useState("");
  const [content, setContnet] = useState("");
  const [userId, setUserId] = useState("");

  const onChangeTitle = (e) => setTitle(e.currentTarget.value);
  const onChangeContent = (e) => setContnet(e.currentTarget.value);
  const onChangeUserId = (e) => setUserId(e.currentTarget.value);

  const users = useSelector(({ users }) => users);

  const dispatch = useDispatch();

  const cantSave = !title || !content || !userId;

  return (
    <section>
      <h2>write post</h2>
      <form>
        <label htmlFor="title">title : </label>
        <input
          name="title"
          type="text"
          id="title"
          value={title}
          onChange={onChangeTitle}
        />
        <label htmlFor="user">Author</label>
        <select name="user" id="user" value={userId} onChange={onChangeUserId}>
          <option value=""></option>
          {users.map((user) => {
            return <option value={user.id}>{user.name}</option>;
          })}
        </select>
        <label htmlFor="content">contnet : </label>
        <textarea
          name="content"
          id="content"
          cols="30"
          rows="10"
          value={content}
          onChange={onChangeContent}
        />
        <button
          type="button"
          disabled={cantSave}
          onClick={() => {
            dispatch(postAdded(userId, title, content));
            setTitle("");
            setContnet("");
            setUserId("");
          }}
        >
          {" "}
          save
        </button>
      </form>
    </section>
  );
}
