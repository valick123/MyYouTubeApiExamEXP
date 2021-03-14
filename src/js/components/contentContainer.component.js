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
                <div key={section}>
                    <h2>
                        {
                            section
                        }
                    </h2>
                    <div>
                        {
                            props.content.map((contentItem,index)=>{
                                const TagName = Cards[section]
                                if(contentItem.source === section){
                                   return <TagName key={index} info={contentItem}/>
                                    
                                }
                                
                            })
                        }
                    </div>
                </div>
            )
        })
    }
    return(
        <Container>
            <Row>
                <Col md={12}>
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
        content:store.main.content
    }
}
 export default connect(mapStateToProps)(ContentContainer)