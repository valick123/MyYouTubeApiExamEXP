import React from "react";
import { useDispatch } from "react-redux";
import YouTube from "react-youtube";

export const YouTubeSearchResultCard = props =>{
    const dispatch = useDispatch()
    const opts = {
        height: '200px',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 0,
          start:parseFloat(props.info.t) || 0,

            
        },
      };
      const addToMainContent = () =>{
        dispatch({
            type:"ADD_NEW_DATA",
            payload:props.info
        })
      }
      const _onReady = e =>{
        e.target.pauseVideo();

    }
    return(
        <div >
            <h2>
                {
                    props.info.title
                }
            </h2>
            <YouTube videoId={props.info.params.v || props.info.params.id} opts={opts} onReady={_onReady} />
            <button onClick={addToMainContent}>Choose</button>
        </div>
        
    )
}
