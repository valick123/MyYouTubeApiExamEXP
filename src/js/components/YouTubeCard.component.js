import React, { useEffect, useState } from "react";
import {YoutubeDataAPI } from "youtube-v3-api";
import YouTube from "react-youtube";
import { useDispatch } from "react-redux";
import { library } from '@fortawesome/fontawesome-svg-core';
import {fas} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const API_KEY = "AIzaSyCN0YB_2GCEinwhT7RSl4akkaTmYL7HOm0";

library.add(fas)

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
    const parseDate = () => {
        const date = new Date(videoData.items[0].snippet.publishedAt );
        return(`Published: ${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`)
    }
    const opts = {
        height: '250px',
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
            ?<div className="youtubeCard" >
                
                
                <YouTube containerClassName="youtubeCard-iframe" videoId={props.info.params.v || props.info.params.id} opts={opts} onReady={_onReady} />
                <div className="youtubeCard-info">
                    <h2 className="youtubeCard-title">
                        {
                            
                            videoData.items[0].snippet.title
                        }
                    </h2>
                    <div className="youtubeCard-statistics">
                        <span className="youtubeCard-likes youtubeCard-statistics-item">
                            <FontAwesomeIcon className="youtubeCard-statistics-ico" icon="thumbs-up" />
                            {
                                videoData.items[0].statistics.likeCount
                            }
                        </span>
                        <span className="youtubeCard-dislikes youtubeCard-statistics-item">
                            <FontAwesomeIcon className="youtubeCard-statistics-ico" icon="thumbs-down" />
                            {
                                videoData.items[0].statistics.dislikeCount
                            }
                        </span>
                        <span className="youtubeCard-views youtubeCard-statistics-item">
                            <FontAwesomeIcon className="youtubeCard-statistics-ico" icon="eye" />
                            {
                                videoData.items[0].statistics.viewCount
                            }
                        </span>
                        <span className="youtubeCard-commentsCount youtubeCard-statistics-item">
                            <FontAwesomeIcon className="youtubeCard-statistics-ico" icon="comments" />
                            {
                                videoData.items[0].statistics.commentCount
                            }
                        </span>
                    </div>
                    <p className="youtubeCard-description">
                        {
                            videoData.items[0].snippet.description
                        }
                    </p>
                    <div className="youtubeCard-buttonGroup">
                        <button className="youtubeCard-btn btn btn-danger" onClick={deleteItem} >delete</button>
                    </div>
                </div>
                
                
                
            </div>
            :null
    )
}

