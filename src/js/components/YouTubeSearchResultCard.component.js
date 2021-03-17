import React from "react";
import { useDispatch } from "react-redux";
import YouTube from "react-youtube";

export const YouTubeSearchResultCard = props =>{
    const dispatch = useDispatch()
    const opts = {
        height: '250px',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 0,
          start:parseFloat(props.info.t) || 0,
          origin:"https://valick123.github.io/MyYouTubeApiExamEXP/"            
        },
      };
      const addToMainContent = () =>{
        dispatch({
            type:"ADD_NEW_DATA",
            payload:props.info
        })
      }
      const parseDate = () => {
          const date = new Date(props.info.publishedAt);
          return(`Published: ${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`)
      }
      const _onReady = e =>{
        e.target.pauseVideo();

    }
    return(
        <div className="youtubeCard" >
                <YouTube  containerClassName="youtubeCard-iframe"  videoId={props.info.params.v || props.info.params.id} opts={opts} onReady={_onReady} />
            
            <div className="youtubeCard-info">
               <h2 className="youtubeCard-title">
                    {
                        props.info.title
                    }
                </h2>
                <p className="youtubeCard-date">
                    
                    {
                        parseDate()
                    }
                </p>
                <p className="youtubeCard-description">
                    {
                        props.info.description
                    }
                </p>
                <div className="youtubeCard-buttonGroup">
                    <button className="youtubeCard-btn btn btn-success" onClick={addToMainContent}>Choose</button> 
                </div>
            </div>
            
        </div>
        
    )
}
