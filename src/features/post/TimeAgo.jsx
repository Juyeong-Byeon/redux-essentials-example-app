import { formatDistanceToNow, parseISO } from 'date-fns'

import React from 'react'

export default function TimeAgo({timeStamp}) {

    let timeAgo='';
    if(timeStamp){
        const date=parseISO(timeStamp);
        const timePeriod=formatDistanceToNow(date);

        timeAgo=`${timePeriod} ago`;
    }

    return (
        <span title={timeStamp}>
            <i>{timeAgo}</i>
        </span>
    )
}
