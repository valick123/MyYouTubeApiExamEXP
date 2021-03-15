import React, { useEffect, useState } from "react";
import {YoutubeDataAPI } from "youtube-v3-api";
import YouTube from "react-youtube";
import { useDispatch } from "react-redux";
const API_KEY = "AIzaSyBZCu1JM8_p5pYc8Jxk-iG8088B44Tmy8Q";

export const YouTubeCard = props =>{
    const dispatch = useDispatch();
    const [videoData, setVideoData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        const api = new YoutubeDataAPI(API_KEY);
        api.searchVideo(props.info.params.v || props.info.params.id)
            .then(data => {
                console.log(data);
                setVideoData(data);
            })
            .then(()=>{
                setIsLoading(false);
            })
    },[props.info])

    const _onReady = e =>{
        e.target.pauseVideo();
        

    }
    const deleteItem = () => {
        dispatch({
            type:"DELETE_DATA_ITEM",
            payload:props.info.params.v || props.info.params.id
        })
    }
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 0,
          start:parseFloat(props.info.params.t) || 0,
          enablejsapi:1
            
        },
      };
    return(
        !isLoading
            ?<div>
                <button onClick={deleteItem} >delete</button>
                <h2>
                    {
                        videoData.items[0].snippet.title
                    }
                </h2>
                <YouTube videoId={props.info.params.v || props.info.params.id} opts={opts} onReady={_onReady} />
                <div>
                    <span>
                        likes:
                        {
                            videoData.items[0].statistics.likeCount
                        }
                    </span>
                    <span>
                        dislikes:
                        {
                            videoData.items[0].statistics.dislikeCount
                        }
                    </span>
                    <span>
                        views:
                        {
                            videoData.items[0].statistics.viewCount
                        }
                    </span>
                    <span>
                        comments:
                        {
                            videoData.items[0].statistics.commentCount
                        }
                    </span>
                </div>
                <p>
                    {
                       videoData.items[0].snippet.channelTitle 
                    }
                </p>
                <p>
                    {
                       videoData.items[0].snippet.tags  
                    }
                </p>
                <p>
                    {
                       videoData.items[0].snippet.publishedAt  
                    }
                </p>
                <p>
                    {
                       videoData.items[0].snippet.description
                    }
                </p>
            </div>
            :null
    )
}

