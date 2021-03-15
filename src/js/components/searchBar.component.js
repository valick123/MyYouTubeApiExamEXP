import React, { useRef } from 'react';
import { Col, Container, Row } from 'reactstrap';
import {connect} from "react-redux";
import {YoutubeDataAPI } from "youtube-v3-api";

const API_KEY = "AIzaSyBZCu1JM8_p5pYc8Jxk-iG8088B44Tmy8Q";

const SearchBar = props =>{
    const requestInput = useRef();
    const sourceSelect = useRef();
    const RegExps = {
         protocolRegexp: /\w+\:\/\//i,
         sourceRegexp: /(\w+\.)*\w+\.\w+/i,
         paramRegexp:/(\w+\=(\w+(\-)?)*)|\/\w{6,}(\?){0,0}/gi
    }
    
    const parseUrl = (url,source) =>{
        let params = {};
       url.match(RegExps.paramRegexp).forEach(param =>{
           let splited = param.split("=");
           if(splited[1]){
           params[splited[0]] = splited[1]; 
           } else {
               params.id = splited[0].replace(/\//,"");
           }
           
       })
        let urlData = {
            source:source,
            params
        };
        console.log(urlData)
        return urlData;
    }
    const youTubeSearchResults = (searchRequest,source)=>{
        const api = new YoutubeDataAPI(API_KEY);
        api.searchAll(searchRequest,20,{type:"video"})
            .then(data=>{
                console.log(data.items);
                let searchResults = [];
                data.items.forEach(item=>{
                    const videoData = {
                        source:source,
                        title:item.snippet.title,
                        description:item.snippet.description,
                        publishedAt:item.snippet.publishedAt,
                        params:{
                            id:item.id.videoId,
                        }
                       
                    }
                    searchResults.push(videoData)
                })
                console.log(searchResults)
                return searchResults
                 
            })
            .then(results =>{
                props.dispatch({
                    type:"GET_SEARCH_RESULTS",
                    payload:results
                })
            })
        
        
    }
    const requestProcessing = () =>{
       const request = requestInput.current.value;
       const selectedSource = sourceSelect.current.value
       RegExps.protocolRegexp.test(request)
       ?urlRequestProcessing(request,selectedSource)
       :searchRequestProcessing(request,selectedSource);
       requestInput.current.value = "";

       
    }
    const urlRequestProcessing = (url,source) =>{     
        switch(source){
            case "Enother":{
                console.log("Choose correct source, please");
                alert("Choose correct source, please");
                break;
            }
            default:{
                props.dispatch({
                    type:"ADD_NEW_DATA",
                    payload:parseUrl(url,source)
                })
                break;
            }
        }          
    }
    const searchRequestProcessing = (searchRequest,source) =>{
        switch(source){
            case "Enother":{
                console.log("Choose correct source, please");
                alert("Choose correct source, please");
                break;
            }
            case "YouTube":{
                youTubeSearchResults(searchRequest,source)
                console.log(`Processing Search Request: (${searchRequest}) on ${source}...`);
                break;
            }
            default:{

               
                console.log(`Processing Search Request: (${searchRequest}) on ${source}...`);
                break;
            }
        } 
        
    }
    const handleKeyPress = (e) =>{
        if(e.key === "Enter"){
            requestProcessing();
        }
    }
    return(
        <Container>
            <Row>
                <Col md={12}>
                    <div className="searchBar">
                        <input ref={requestInput} onKeyPress={handleKeyPress} className="searchBar-input" type="text" placeholder="Enter Url or Keyword" />
                        <div className="searchBar-controls">
                            <select ref={sourceSelect} className="custom-select searchBar-select" defaultValue="YouTube">
                                <option value="YouTube">YouTube</option>
                                <option value="Enother">Enother</option>
                            </select>
                            <button className="searchBar-btn" onClick={requestProcessing}>Search</button>
                        </div>
                        
                    </div>                        
                </Col>
            </Row>
        </Container>
            
        
    )
}

const mapStateToProps = store =>{
    return {
        content:store.main.content,
        isOpenModal:store.main.isOpenModal,
        modalContent:store.main.modalContent
    }
}
 export default connect(mapStateToProps)(SearchBar)

    
        
    