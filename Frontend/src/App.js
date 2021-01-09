import React, {useEffect, useState} from 'react'
import './App.css';
import axios from 'axios';
import { BrowserRouter, Switch, Route ,Link} from "react-router-dom";
import Confetti from 'react-confetti'
import { useDispatch,useSelector } from 'react-redux'

import Navigation from './Components/Navigation'
import Component from './Component';


function App() {
  const user = useSelector(state => state.user)
  const [navlist,routecomponents,navlistforclient,routecomponentsclient]=Component()
  const [navigation,setNavigation] = useState(navlist);
  const [routing,setRouting] = useState(routecomponents);
  

  useEffect(() => {
    console.log(user)
    if(user && user.Usertype==1){
      setNavigation(navlistforclient);
      setRouting(routecomponentsclient);
    }
    else if(user=="lawyer"){
     
    }
    else{
      setNavigation(navlist);
      setRouting(routecomponents);
    }
  }, [user])

  return (
    <div>
      <BrowserRouter>

                <Navigation
                    content={navigation.map((item,index) =>   
                      <li className="nav-item active" key={index}>
                        <div className="nav-link" onClick={item.click}>
                          <Link className="links" style={{ textDecoration: 'none'}} to={item.path}>{item.name}</Link>
                        </div>
                      </li>  
                  )}/>

                <Switch>

                  {routing.map(({Component,path},index) =>   
                      <Route
                      exact
                      key={index}
                      path={path}
                      render={props => (
                        <Component {...props}
                        User={user}
                        />
                      )}
                    />  
                  )}

                </Switch>

              </BrowserRouter>
    </div>
  )
}

export default App
