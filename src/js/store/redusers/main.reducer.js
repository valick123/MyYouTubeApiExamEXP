const initialState = {
    videoList:[]
}
export const mainReducer = (state = initialState, action) =>{
    switch(action.type){
        case "ADD_VIDEO_INFO":{
            return {
                ...state,
                videoList:[action.payload,...state.videoList ]
            }
        }
        default:{
            return state;
        }
    }
}
