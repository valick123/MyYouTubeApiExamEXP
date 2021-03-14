import React, { useEffect, useState } from "react";
import {connect} from "react-redux";
import {YoutubeDataAPI } from "youtube-v3-api";
import YouTube from "react-youtube";
const API_KEY = "AIzaSyBZCu1JM8_p5pYc8Jxk-iG8088B44Tmy8Q";

export const YouTubeCard = props =>{
   

    const _onReady = e =>{
        e.target.pauseVideo();
        

    }
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 0,
          start:parseFloat(props.info.params.t) || 0
            
        },
      };
    return(
            <div>
                <p>VideoID:{props.info.params.v || props.info.params.id}</p>
                <YouTube videoId={props.info.params.v || props.info.params.id} opts={opts} onReady={_onReady} />
            </div>
            
            
           
        
    )
}

