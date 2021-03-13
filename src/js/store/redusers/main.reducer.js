const initialState = {
    
        YouTube:[]
}
export const mainReducer = (state = initialState, action) =>{
    switch(action.type){
        case "ADD_NEW_DATA":{
           
            return {
                ...state,
                [action.payload.source]:[action.payload,...state[action.payload.source]]
            }
        }
        default:{
            return state;
        }
    }
}
