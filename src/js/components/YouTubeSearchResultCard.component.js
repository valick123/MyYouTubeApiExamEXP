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
        <div className="youtybeSearchCard" >
                <YouTube  containerClassName="youtybeSearchCard-iframe"  videoId={props.info.params.v || props.info.params.id} opts={opts} onReady={_onReady} />
            
            <div className="youtybeSearchCard-info">
               <h2 className="youtybeSearchCard-title">
                    {
                        props.info.title
                    }
                </h2>
                <p className="youtybeSearchCard-date">
                    
                    {
                        parseDate()
                    }
                </p>
                <p className="youtybeSearchCard-description">
                    {
                        props.info.description
                    }
                </p>
                <div className="youtybeSearchCard-buttonGroup">
                    <button className="youtybeSearchCard-btn" onClick={addToMainContent}>Choose</button> 
                </div>
            </div>
            
        </div>
        
    )
}
