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
      if(data.password==data.password_confirmation){
      axios
      .post(SERVER_URL+'/client/add', 
          {
              "username":data.user,
              "pass":data.password,
              "email":data.email,
              "repass":data.password_confirmation
          }
          ,
      { withCredentials: true }
    )
    .then(response => {
        if (response.status === 200 ) {
          dispatch({ type: "CLIENT", data:response.data })
          window.location.href='/clientdash'
        }
       
        console.log(response.data)
      })
      .catch(error => {
        setError('Auth Failed!')
      });
  }
  else{
    setError("Passwords doesnt match!")
  }
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
            <div className="display-4">Registration Form</div><br/>
        </Fade>
        <form className="mx-auto d-block" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label>Username:</label>
        <input type="text" placeholder="Enter Username" className="form-control" name="user" ref={register({ required: true})} />
        </div><br/>
        <div className="form-group">
        <label>Email:</label>
        <input type="text" placeholder="Enter Email" className="form-control" name="email" ref={register({ required: true})} />
        </div><br/>
        <div className="form-group">
        <label>Password:</label>
        <input type="text" placeholder="Enter Password" className="form-control" name="password" ref={register({ required: true})} />
        </div><br/>
        <div className="form-group">
        <label>Password Confirmation:</label>
        <input type="text" placeholder="Re-enter Password" className="form-control" name="password_confirmation" ref={register({ required: true })} />
        </div>
        {}

        <button className="btn btn-primary" type="submit">Register</button><br/>
        <h2><span className="badge badge-secondary">{errors.user  && <span>Username is required</span>}</span></h2>
        <h2><span className="badge badge-secondary">{errors.email  && <span>Email is required</span>}</span></h2>
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
