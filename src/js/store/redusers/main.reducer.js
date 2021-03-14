const initialState = {    
        content:[],
        isOpenModal:false,
        modalContent:null,
}
export const mainReducer = (state = initialState, action) =>{
    switch(action.type){
        case "ADD_NEW_DATA":{
           
            return {
                ...state,
                content:[action.payload,...state.content]
            }
        }
        case "MODAL_TOGGLE":{
            return{
                ...state,
                isOpenModal:!state.isOpenModal
            }
        }
        case "ADD_MODAL_CONTENT":{
            return {
                ...state,
                modalContent:action.payload
            }
        }
        default:{
            return state;
        }
    }
}
