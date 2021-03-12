import React, { useRef } from 'react';
import { Col, Container, Row } from 'reactstrap';
import {VideoCard} from "../videoCard.component"
import {YoutubeDataAPI } from "youtube-v3-api";
import YouTube from "react-youtube";
import {connect} from "react-redux";

const HomePageComponent = props =>{
    const newVideoInput = useRef();
    const parseVideoUrl = () =>{
        const value = newVideoInput.current.value;
        const protocolRegexp = /\w+\:\/\//i;
        const sourceRegexp = /(\w+\.)*\w+\.\w+/i;
        const paramsRedexp =/((\w+\?)?((\&|#)?\w+\=?\w+(\-)?(\.\w+)?\&?)*)$/gi
        console.log(value.match(paramsRedexp));
        let videoData = {
            protocol:value.match(protocolRegexp)[0],
            source:value.match(sourceRegexp)[0],
            params:{
                start:value.match(paramsRedexp)[0].replace(/watch\?/ig, "").match(/(?:t\=)\d+/)
                    ?+value.match(paramsRedexp)[0].replace(/watch\?/ig, "").match(/(?:t\=)\d+/)[0].replace(/t\=/,"")
                    :0,
                videoId:value.match(paramsRedexp)[0].replace(/watch\?\w+\=/ig, "").match(/(\w+(\-)?)*/i)[0]
            },
        };
        console.log(videoData,'==============')
        props.dispatch({
            type:"ADD_VIDEO_INFO",
            payload:videoData
        })
    }
    
    return(    
               
            <Container>
                <Row>
                    <Col  md={12}>
                        <input ref={newVideoInput} type="text" />
                        <button onClick={parseVideoUrl}>add</button>
                        {
                            props.videoList.map((item,index)=>{
                                return <VideoCard params={item.params} key={index}/>
                            })
                        }
                    </Col>
                </Row>
            </Container>          
        )
    
}
const mapStateToProps = store =>{
    return {
        ...store.main
    }
}
 export default connect(mapStateToProps)(HomePageComponent)

    
        
    


