import React from "react";
import { connect } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import {YouTubeSearchResultCard }from "./YouTubeSearchResultCard.component"
const SearchResults = props => {
    const Cards = {
        YouTube: YouTubeSearchResultCard,

    }
    const deleteResults = () =>{
        props.dispatch({
            type:'DELETE_SEARCH_RESULTS'
        })
    } 
    const renderSearchResults = () =>{
        const sectionsList = [];
        props.searchResults.forEach((item)=>{
            !sectionsList.includes(item.source)
            ?sectionsList.push(item.source)
            :null
        })
        console.log(sectionsList)
        return sectionsList.map((section)=>{
            return(
                <Row key={section}>
                   <Col md={12} >
                        <h2>
                            {
                                section
                            }
                        </h2>
                    </Col>
                    
                        {
                            props.searchResults.map((contentItem,index)=>{
                                const TagName = Cards[section]
                                if(contentItem.source === section){
                                   return (
                                       <Col md={3} key={index}>
                                           <TagName  info={contentItem}/>
                                       </Col>
                                   
                                   )
                                    
                                }
                                
                            })
                        }
                    
                 
                </Row>
                
            )
        })
    }
    return(
        props.searchResults.length
        ?<Container>
            <Row>
                <Col md={12}>
                <h2>Search Results</h2>
                <button onClick={deleteResults}>Clear</button> 
                </Col>
            </Row>    
                {
                    renderSearchResults()
                }
            
        </Container>     
        :null
        
    )
}

const mapStateToProps = store =>{
    return {
        searchResults:store.main.searchResults
    }
}
export default connect(mapStateToProps)(SearchResults);