import React from 'react';
import {Container} from 'reactstrap';
import {connect} from "react-redux";
import SearchBar from "../searchBar.component";
import ContentContainer from '../contentContainer.component';
import CustomModal from '../CustomModal.component';

const HomePageComponent = props =>{
   
    
    
    return(    
               
            <Container>
                <SearchBar/>
                <ContentContainer/>   
                <CustomModal/>                    
            </Container>          
        )
    
}
const mapStateToProps = store =>{
    return {
        main:store.main
    }
}
 export default connect(mapStateToProps)(HomePageComponent)

    
        
    


