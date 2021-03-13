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
         newParamRegexp:/(\w+\=(\w+(\-)?)*)|\/\w{6,}(\?){0,0}/gi
    }
    const Cards = {
        YouTube: YouTubeCard,

    }
    const parseUrl = (value) =>{
        let params = {};
       value.match(RegExps.newParamRegexp).forEach(param =>{
           let splited = param.split("=");
           if(splited[1]){
           params[splited[0]] = splited[1]; 
           } else {
               params.id = splited[0].replace(/\//,"");
           }
           
       })
        let urlData = {
            protocol:value.match(RegExps.protocolRegexp)[0],
            source:"YouTube",
            params
        };
        console.log(urlData);
        return urlData;
    }
    const requestProcessing = () =>{
       const value = requestInput.current.value;
       RegExps.protocolRegexp.test(value)
       ?processingUrlRequest(value)
       :processingSearchRequest(value)
       
    }
    const processingUrlRequest = (url) =>{        
                props.dispatch({
                    type:"ADD_NEW_DATA",
                    payload:parseUrl(url)
                })
              
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
                        <select ref={sourceSelect} defaultValue="YouTube">
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

    
        
    


