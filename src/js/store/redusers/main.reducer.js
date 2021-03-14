const initialState = {
    
        content:[]
}
export const mainReducer = (state = initialState, action) =>{
    switch(action.type){
        case "ADD_NEW_DATA":{
           
            return {
                ...state,
                content:[action.payload,...state.content]
            }
        }
        default:{
            return state;
        }
    }
}
