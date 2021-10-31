import React from "react";
import {selectUserById} from './userSlice'
import { useSelector } from "react-redux";

export default function PostAuthor({ userId }) {
  const author = useSelector(selectUserById(userId));
  console.log(userId)
  console.log(author);

  return <span>by {author ? author.name : "Unknown author"}</span>;
}
