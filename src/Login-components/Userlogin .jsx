import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import UserAuthService from "../Login-services/UserAuth-service ";
import "../Login-components/loginbackground.css";
import profile from "../Images/user.jpg";
import MainNavBar from "../Navbar/NavBar";


const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="text-danger" role="alert">
        Username required!
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="text-danger" role="alert">
        Password required!
      </div>
    );
  }
};
export default class Userlogin extends Component {

  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      UserAuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("/userRequestView");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div>
        <MainNavBar />
      <div className="loginbackground">
          <div className="main">
            <div className="sub-main">
              <div>
                <div className="imgs">
                  <div className="container-image">
                    <img src={profile} alt="profile" className="profile" />
                  </div>
                </div>
                <div className="col-md-12">
                  <Form
                    onSubmit={this.handleLogin}
                    ref={c => {
                      this.form = c;
                    }}
                  >
                    <div className="form-group">
                      <label className="labelname">User Name</label>
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
                    </div><br />
                    <div className="form-group">
                      <button
                        disabled={this.state.loading}
                      >
                        {this.state.loading && (
                          <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span className="login-button">Login</span>
                      </button>
                      <div className="link">
                        <div>Not a member ? <a href="/userregister"> SignUp</a></div><br />
                      </div>
                      
                    </div>
                    {this.state.message && (
                      <div className="form-group">
                        <div className="alert alert-danger" role="alert">
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
