import React, { useRef } from 'react';
import { Col, Container, Row } from 'reactstrap';
import {YouTubeCard} from "../videoCard.component"
import {YoutubeDataAPI } from "youtube-v3-api";
import YouTube from "react-youtube";
import {connect} from "react-redux";

const HomePageComponent = props =>{
    const requestInput = useRef();
    const sourceSelect = useRef();
    const RegExps = {
         protocolRegexp: /\w+\:\/\//i,
         sourceRegexp: /(\w+\.)*\w+\.\w+/i,
         paramsRedexp:/((\w+\?)?((\&|#)?\w+\=?\w+(\-)?(\.\w+)?\&?)*)$/gi,
    }
    const Cards = {
        YouTube: YouTubeCard,

    }
    const parseYoutubeUrl = (value) =>{
        let videoData = {
            protocol:value.match(RegExps.protocolRegexp)[0],
            source:"YouTube",
            params:{
                start:value.match(RegExps.paramsRedexp)[0].replace(/watch\?/ig, "").match(/(?:t\=)\d+/)
                    ?+value.match(RegExps.paramsRedexp)[0].replace(/watch\?/ig, "").match(/(?:t\=)\d+/)[0].replace(/t\=/,"")
                    :0,
                videoId:value.match(RegExps.paramsRedexp)[0].replace(/watch\?\w+\=/ig, "").match(/(\w+(\-)?)*/i)[0]
            },
        };
        return videoData;
    }
    const requestProcessing = () =>{
       const value = requestInput.current.value;
       RegExps.protocolRegexp.test(value)
       ?processingUrlRequest(value)
       :processingSearchRequest(value)
       console.log(value.match(/(\w+\=(\w+(\-)?)*)|\/\w{6,}/g))
    }
    const processingUrlRequest = (url) =>{
        switch(sourceSelect.current.value){
            case "Youtube" :{
                props.dispatch({
                    type:"ADD_YOUTUBE_VIDEO_INFO",
                    payload:parseYoutubeUrl(url)
                })
                break;
            }
            default:{
                console.log("Check your request or choose correct source, please...")
            }
        }
    }
    const processingSearchRequest = (searchRequest) =>{
        console.log(`Processing Search Request: (${searchRequest})...`);
    }
    const renderSections = () =>{
        return Object.keys(props.main).map((section, index) => {
            return props.main[section].length
            ?<div key = {index}>
                    <h2>
                        {section}
                    </h2>
                    <div>
                        {
                            props.main[section].map((item, index)=>{
                                const TagName = Cards[section];
                                return <TagName key={index} info={item} />
                            })
                        }
                    </div>
            </div>
            :null
        })
    }
    return(    
               
            <Container>
                <Row>
                    <Col  md={12}>
                        <input ref={requestInput} type="text" />
                        <select ref={sourceSelect} defaultValue="Enother">
                            <option value="Youtube">Youtube</option>
                            <option value="Enother">Enother</option>
                        </select>
                        <button onClick={requestProcessing}>add</button>
                       {
                           renderSections()
                       }
                    </Col>
                </Row>
            </Container>          
        )
    
}
const mapStateToProps = store =>{
    return {
        main:store.main
    }
}
 export default connect(mapStateToProps)(HomePageComponent)

    
        
    


