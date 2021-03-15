import React from "react";
import { Col, Container, Row } from 'reactstrap';
import {YouTubeCard} from "./YouTubeCard.component"
import {connect} from "react-redux";

const ContentContainer = props =>{
    const Cards = {
        YouTube: YouTubeCard,

    }
   
    const renderSections = () =>{
        const sectionsList = [];
        props.content.forEach((item)=>{
            !sectionsList.includes(item.source)
            ?sectionsList.push(item.source)
            :null
        })
        console.log(sectionsList)
        return sectionsList.map((section)=>{
            return(
                <Row key={section}>
                    <Col md={12}>
                        <h2>
                            {
                                section
                            }
                        </h2>
                    </Col>
                    
                    
                        {
                            props.content.map((contentItem,index)=>{
                                const TagName = Cards[section]
                                if(contentItem.source === section){
                                   return (
                                       <Col md={4} key={index}>
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
    const deleteContent = () => {
        props.dispatch({
            type:"DELETE_ALL_DATA"
        })
    }
    return(
        props.content.length
        ?<Container>
            <Row>
                <Col md={12}>
                    <h2>Content</h2>
                    <button onClick={deleteContent} >Delete All</button>
                </Col>
            </Row>
            {
                renderSections()
            }
         </Container>
        :null
            
    )
}    

const mapStateToProps = store =>{
    return {
        content:store.main.content
    }
}
 export default connect(mapStateToProps)(ContentContainer)