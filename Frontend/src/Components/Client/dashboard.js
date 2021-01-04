import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'

function Dashboard() {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    return (
        <div>
            Client Dashboard<br/>
            {user && user.username}
        </div>
    )
}

export default Dashboard
