import React, { useRef } from 'react';
import { Col, Container, Row } from 'reactstrap';
import {connect} from "react-redux";

const SearchBar = props =>{
    const requestInput = useRef();
    const sourceSelect = useRef();
    const RegExps = {
         protocolRegexp: /\w+\:\/\//i,
         sourceRegexp: /(\w+\.)*\w+\.\w+/i,
         paramsRedexp:/((\w+\?)?((\&|#)?\w+\=?\w+(\-)?(\.\w+)?\&?)*)$/gi,
         newParamRegexp:/(\w+\=(\w+(\-)?)*)|\/\w{6,}(\?){0,0}/gi
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
       const url = requestInput.current.value;
       const selectedSource = sourceSelect.current.value
       RegExps.protocolRegexp.test(url)
       ?processingUrlRequest(url,selectedSource)
       :processingSearchRequest(url,selectedSource)
       
    }
    const processingUrlRequest = (url,source) =>{     
        switch(source){
            case "Enother":{
                console.log("Choose correct source, please");
                alert("Choose correct source, please");
                break;
            }
            default:{
                props.dispatch({
                    type:"ADD_NEW_DATA",
                    payload:parseUrl(url)
                })
                break;
            }
        }          
    }
    const processingSearchRequest = (searchRequest,source) =>{
        switch(source){
            case "Enother":{
                console.log("Choose correct source, please");
                alert("Choose correct source, please");
                break;
            }
            default:{
                console.log(`Processing Search Request: (${searchRequest}) on ${source}...`);
                break;
            }
        } 
        
    }
    return(
        <Container>
            <Row>
                <Col md={12}>
                <input ref={requestInput} type="text" />
                        <select ref={sourceSelect} defaultValue="YouTube">
                            <option value="Youtube">Youtube</option>
                            <option value="Enother">Enother</option>
                        </select>
                        <button onClick={requestProcessing}>add</button>
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = store =>{
    return {
        content:store.main.content
    }
}
 export default connect(mapStateToProps)(SearchBar)

    
        
    