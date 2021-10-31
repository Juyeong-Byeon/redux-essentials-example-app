import React,{useEffect} from "react";
import { fetchPosts, selectAllPosts } from "./postSlice";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import PostAuthor from "../user/PostAuthor";
import ReactionButtons from './ReactionButtons';
import { Spinner } from "../../components/Spinner";
import TimeAgo from './TimeAgo';

const PostExcerpt=({post})=>{
	return (
	<article className="post-excerpt" key={post.key}>
	  <h2>{post.title}</h2>
	  <PostAuthor userId={post.user} />
	  <TimeAgo timeStamp={post.date}/>
	  <p>{post.content.substring(0, 100)}</p>
	  <Link className="button muted-button" to={`post/${post.id}`}>
		View post
	  </Link>
	  <ReactionButtons post={post}/>
	</article>
	)
}


export default function PostList() {

  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  
  const postStatus=useSelector(({posts})=>posts.status);
  const error=useSelector(({posts})=>posts.error);

  useEffect(() => {
	  if(postStatus==='idle')dispatch(fetchPosts());
  }, [postStatus,dispatch]);

  
  let content;

  if(postStatus==='loading'){
	  content=<Spinner text='Loading...'/>
  }else if(postStatus==='succeeded'){
	const sortedPosts=posts.slice().sort((a,b)=>b.date.localeCompare(a.date));
	  content=sortedPosts.map((post) => <PostExcerpt post={post}/>);
  }else if(postStatus==='failed'){
	  content=<div>{error}</div>
  }


  return <section className="posts-list">{content}</section>;
}
