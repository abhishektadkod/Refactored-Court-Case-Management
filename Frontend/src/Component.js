import Home from './Components/Home';
import ClientLogin from './Components/Client/ClientLogin';
import LawyerLogin from './Components/Lawyer/LawyerLogin';
import LawyerDashboard from './Components/Lawyer/dashboard';
import ClientDashboard from './Components/Client/dashboard';

import { SERVER_URL } from "./Config";

import { useDispatch,useSelector } from 'react-redux'
import axios from "axios";

import React from 'react'

function Component() {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const logout=()=>{
        let Usertype=user.Usertype==1?"/client":"/lawyer"
        axios
        .get(SERVER_URL+Usertype+"/logout/"+user._id, { withCredentials: true })
        .then(response => {
            dispatch({type:"LOGOUT"})
            localStorage.removeItem("state");
            window.location.href="/"    
        })
        .catch(error => {
          alert("logout error:", error);
        });
       
    }
    
    const navlist=[
        {'name':'Home','path':'/'},
        {'name':'Register','path':'/register'},
        {'name':'Login','path':'/clientlogin'},
        {'name':'Lawyer','path':'/lawyerlogin'},
        {'name':'Logout','path':'/logout','click':()=>logout()}
    ];
    const routecomponents=[
        {'Component':Home,'path':'/'},
        // {'Component':Registration,'path':'/register'},
        {'Component':ClientLogin,'path':'/clientlogin'},
        {'Component':LawyerLogin,'path':'/lawyerlogin'},
        {'Component':ClientDashboard,'path':'/clientdash'},
        {'Component':LawyerDashboard,'path':'/lawyerdash'},
    ];

    return [navlist,routecomponents]
}

export default Component
