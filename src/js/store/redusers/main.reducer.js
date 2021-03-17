const initialState = {    
        content:[
            {
                params: {id: "Bluxbh9CaQ0"},
                source: "YouTube_Example",
            },
            {
                params: {v: "6QjIHnb5Ivs"},
                source: "YouTube_Example"
            },
            {
                params: {v: "ZfCOGMs5-v0"},
                source: "YouTube_Example"
            },
            {
                params: {v: "gx2AxPtETNU"},
                source: "YouTube_Example"
            }
        ],
        searchResults:[]
}
export const mainReducer = (state = initialState, action) =>{
    switch(action.type){
        case "ADD_NEW_DATA":{
           
            return {
                ...state,
                content:[action.payload,...state.content]
            }
        }
        case "GET_SEARCH_RESULTS":{
            return {
                ...state,
                searchResults:action.payload
            }
        }
        case "DELETE_SEARCH_RESULTS":{
            return{
                ...state,
                searchResults:[]
            }
        }
        case "DELETE_DATA_ITEM":{
            return{
                ...state,
                content:[...state.content.filter(item=>item.params.id === action.payload || item.params.v === action.payload ?false:true )]
            }
        }
        case "DELETE_ALL_DATA":{
            return{
                ...state,
                content:[]
            }
        }
        default:{
            return state;
        }
    }
}
