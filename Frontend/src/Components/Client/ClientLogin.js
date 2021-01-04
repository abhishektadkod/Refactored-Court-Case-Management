import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import {Fade} from 'react-reveal';
import {Zoom} from 'react-reveal';
import { SERVER_URL } from "../../Config";


function ClientLogin() {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, errors } = useForm();
  const [error,setError] = useState('')

  const onSubmit = (data) => {
      console.log(data)
    axios
        .post(SERVER_URL+'/client/login', 
            {
                "username":data.user,
                "pass":data.password
            }
			,
        { withCredentials: true }
      )
      .then(response => {
        if (response.status === 200 ) {
          //this.props.handleLogin(response.data);
          dispatch({ type: "CLIENT", data:response.data })
          window.location.href='/clientdash'
        }
       
        console.log(response.data)
      })
      .catch(error => {
        setError('Auth Failed!')
      });
  };

  return (
    <div>
         <div className="container">
        <Zoom>
        <br/><br/><br/><br/>
      <div  className="row" style={{color:"#4a4538",backgroundColor:"#edebe6",fontSize:"30px",fontWeight:"lighter"}}>
      <div className="col-md-2"></div>
      <div className="col-md-8"><br/>
        <Fade top opposite cascade>
            <div className="display-4">Login Form</div><br/>
        </Fade>
        <form className="mx-auto d-block" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label>Username:</label>
        <input type="text" placeholder="Enter Username" className="form-control" name="user" ref={register({ required: true})} />
        </div><br/>
        <div className="form-group">
        <label>Password:</label>
        <input type="text" placeholder="Enter Password" className="form-control" name="password" ref={register({ required: true })} />
        </div>
        {}

        <button className="btn btn-primary" type="submit">Login</button><br/>
        <h2><span className="badge badge-secondary">{errors.user  && <span>Username is required</span>}</span></h2>
        <h2><span className="badge badge-secondary">{errors.password  && <span>Password is required</span>}</span></h2>
        <h2><span className="badge badge-secondary">{error}</span></h2>
      </form>
        <br/>
      </div>
      </div>
      </Zoom>
      </div>
     
    </div>
    
  );
}

export default ClientLogin;
