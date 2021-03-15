import React from 'react';
import {Container} from 'reactstrap';
import {connect} from "react-redux";
import SearchBar from "../searchBar.component";
import ContentContainer from '../contentContainer.component';
import { HeaderBlock } from '../headerBlock.component';
import SearchResults from '../searchresults.component';

const HomePageComponent = props =>{
   
    
    
    return(    
               
            <>
                <HeaderBlock/>
                <SearchBar/>
                <SearchResults/>  
                <ContentContainer/>                 
            </>          
        )
    
}
const mapStateToProps = store =>{
    return {
        main:store.main
    }
}
 export default connect(mapStateToProps)(HomePageComponent)

    
        
    


