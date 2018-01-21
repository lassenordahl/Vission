import React from 'react';
import { GoogleLogin } from 'react-google-login-component';
 
class Login extends React.Component{
 
  constructor (props, context) {
    super(props, context);
  }
 
  responseGoogle (googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    console.log({accessToken: id_token});
    //anything else you want to do(save to localStorage)...
  }
 
  render () {
    return (
      <div>
        <GoogleLogin socialId="396611738669-ce4nt5d8kgvop5ui68iee7v2mn5gd7su.apps.googleusercontent.com"
                     className="google-login"
                     scope="profile"
                     fetchBasicProfile={false}
                     responseHandler={this.responseGoogle}
                     buttonText="Login"/>
      </div>
    );
  }
 
}
 
export default Login;