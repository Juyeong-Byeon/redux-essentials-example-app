import React from 'react';
import { reactionAdded } from './postSlice';
import {useDispatch} from 'react-redux';

const reactionEmoji={
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀'
}


export default function ReactionButtons({post}) {

    const dispatch = useDispatch();

    const reactionButtons=Object.entries(reactionEmoji).map(([name,emoji])=>{
        return (
            <button 
                type='button' 
                key={name} 
                className="muted-button reaction-button" 
                onClick={()=>dispatch(reactionAdded({postId:post.id,reaction:name}))}
            > 
                {emoji} {post.reactions[name]}
            </button>
        )
    })
    return (
        <div>
            {reactionButtons} 
        </div>
    )
}
