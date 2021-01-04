const initialState = {
    user:""
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLIENT": 
        return {user:action.data}
    
    case "LAWYER": 
        return {user:"lawyer"}
    
    case "LOGOUT":
        return {user:""}
    

    default: return state
  }
}

export default userReducer