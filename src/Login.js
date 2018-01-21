import React from 'react';
import { GoogleLogin } from 'react-google-login-component';
 
class Login extends React.Component{
 
  constructor (props, context) {
    super(props, context);
  }
 
  responseGoogle (googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    console.log({accessToken: id_token});
    console.log('DAMN BOI HE THICC');
    console.log(googleUser);
    }
 
  render () {
    return (
      <div>
        <GoogleLogin socialId="396611738669-gopcniqlfh179th8ftim2haab1v9lk6p.apps.googleusercontent.com"
                     className="google-login"
                     scope="profile"
                     fetchBasicProfile={true}
                     responseHandler={this.responseGoogle}
                     buttonText="Login"/>
      </div>
    );
  }
 
}
 
export default Login;