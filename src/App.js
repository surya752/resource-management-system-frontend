import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Adminlogin from "./Login-components/Adminlogin";
import AdminRegister from "./Login-components/Adminregister";
import MainNavBar from "./Navbar/NavBar";
import Home from "./Pages/Home";
import Userlogin from "./Login-components/Userlogin ";
import UserRegister from "./Login-components/UserRegister ";
import ViewResource from "./Admin-components/ViewResource";
import UpdateResource from "./Admin-components/UpdateResource";
import AddResource from "./Admin-components/AddResource";
import ViewAllocations from "./Admin-components/ViewAllocations";
import UserRequestView from "./User-components/UserRequestView";
import UpdateUserRequest from "./User-components/UpdateUserRequest";
import AddUserRequest from "./User-components/AddUserRequest";
import UserRequestAllocations from "./Admin-components/UserRequestAllocations";




class App extends Component {
  render(){
    return(
          <Switch>
            <Route exact path='/' component={Home} /> 
             <Route exact path="/navbar" component={MainNavBar} />
            <Route exact path="/adminlogin" component={Adminlogin} />
            <Route path = "/adminregister" component = {AdminRegister}/>
            <Route path="/userlogin" component={Userlogin}/>
            <Route path="/userregister" component={UserRegister} />
          
            <Route path = "/addResource" component = {AddResource}/>
            <Route path = "/viewResource" component = {ViewResource}/>
            <Route path = "/updateResource/:id" component = {UpdateResource}/>
            <Route path = "/viewAllocations/:resourceName" component = {ViewAllocations}/>
            <Route path = "/userAllocationRequest" component = {UserRequestAllocations}/>
    
            <Route path = "/addUserRequest" component = {AddUserRequest}/>
            <Route path = "/userRequestView" component = {UserRequestView}/>
            <Route path = "/updateUserRequest/:id" component = {UpdateUserRequest}/>
            
          </Switch>
    )
  }
}
export default App;
