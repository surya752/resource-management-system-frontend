import React from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import "../Login-components/loginbackground.css";
import AuthService from "../Login-services/auth.service";
import profile from "../Images/admin.jpg";
import MainNavBar from "../Navbar/NavBar";
import { Link } from "react-router-dom";

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Email required!
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
         Password must be between 6 and 40 characters.
      </div>
    );
  }
};
const Cpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Confirm password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class AdminRegister extends  React.Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeCPassword = this.onChangeCPassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      cpassword:"",
      successful: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  onChangeCPassword(e) {
    this.setState({
      cpassword: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password,
        this.state.cpassword

      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div>
      <MainNavBar/>
      <div className="loginbackground">
      <div className="main">
   <div className="sub-main">
     <div>
       <div className="imgs">
         <div className="container-image">
           <img src={profile} alt="profile" className="profile"/>
         </div>
       </div>
       
    <div className="col-md-12">
          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label className="labelname">Admin Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[vusername]}
                  />
                </div>

                <div className="form-group">
                  <label className="labelname">AdminEmail</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[ email]}
                    // validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label className="labelname">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[vpassword]}
                  />
                </div>
                  <div className="form-group">
                    <label className="labelname"> Confirm Password</label>
                    <Input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Confirm Password"
                      value={this.state.cpassword}
                      onChange={this.onChangeCPassword}
                      validations={[Cpassword]}
                    />
                  </div><br/>

                <div className="form-group">
                  <button > <span className="login-button">SignUp</span></button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
            <span>
             You Have Already Account ? <Link to= "/adminlogin"> SignIn</Link><br/>
            </span>
          </Form>
        </div>
      </div>
      </div>
      </div>
      </div>
      </div>
  
    );
  }
}
