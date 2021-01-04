import React from 'react'
import { useDispatch,useSelector } from 'react-redux'

function LawyerLogin() {
  const dispatch = useDispatch()
    return (
        <div>
            <button onClick={()=>dispatch({type:"LAWYER"})}>Login</button>
        </div>
    )
}

export default LawyerLogin
