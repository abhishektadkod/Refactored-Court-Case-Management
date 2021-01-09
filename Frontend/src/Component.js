import Home from './Components/Home';

import ClientRegister from './Components/Client/ClientRegister';
import ClientLogin from './Components/Client/ClientLogin';
import ClientDashboard from './Components/Client/dashboard';
import ClientViewcase from './Components/Client/ViewCase';
import Notify from './Components/Client/notify';

import LawyerLogin from './Components/Lawyer/LawyerLogin';
import LawyerDashboard from './Components/Lawyer/dashboard';



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
       
    ];
    const routecomponents=[
        {'Component':Home,'path':'/'},
        {'Component':ClientRegister,'path':'/register'},
        {'Component':ClientLogin,'path':'/clientlogin'},
        {'Component':LawyerLogin,'path':'/lawyerlogin'},
        // {'Component':ClientDashboard,'path':'/clientdash'},
        {'Component':LawyerDashboard,'path':'/lawyerdash'},
    ];

    const navlistforclient=[
        {'name':'Home','path':'/clientdash'},
        // {'name':'My Profile','path':'/dash'},
        {'name':'Register a case','path':'/case'},
        {'name':'Registered Cases','path':'/viewcases/0'},
        // {'name':'History of hearings','path':'/dash'},
        {'name':'Logout','path':'/logout','click':()=>logout()},
      ];

      const routecomponentsclient=[
        {'Component':Home,'path':'/'},
        {'Component':Notify,'path':'/clientdash'},
        {'Component':ClientDashboard,'path':'/case'},
        {'Component':ClientViewcase,'path':'/viewcases/:id'},
      ];

    return [navlist,routecomponents,navlistforclient,routecomponentsclient]
}

export default Component
