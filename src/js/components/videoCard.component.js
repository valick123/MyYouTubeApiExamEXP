import React, { useEffect, useState } from "react";
import {connect} from "react-redux";
import {YoutubeDataAPI } from "youtube-v3-api";
import YouTube from "react-youtube";
const API_KEY = "AIzaSyBZCu1JM8_p5pYc8Jxk-iG8088B44Tmy8Q";

export const YouTubeCard = props =>{
    const [videoInfo, setVideoInfo] = useState(null);
    const[isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        const api = new YoutubeDataAPI(API_KEY);
        api.searchVideo(props.info.params.videoId)
            .then(data=> setVideoInfo(data))
            .then(()=>{
                setIsLoading(false)
            })
    },[])

    const _onReady = e =>{
        e.target.pauseVideo();
        

    }
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 0,
          start:props.info.params.start
        },
      };
    return(
        !isLoading
        ?<div>
            <h1>
                {
                    videoInfo.items[0].snippet.title
                }
            </h1>
            <YouTube videoId={props.info.params.videoId} opts={opts} onReady={_onReady} />
            <span>
                {
                    videoInfo.items[0].snippet.publishedAt
                }
            </span>
            <p>
                {
                    videoInfo.items[0].snippet.description
                }
            </p>
        </div>
        :null
    )
}

