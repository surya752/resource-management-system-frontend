import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import UserNavBar from "./UserNavBar";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import UpgradeSharpIcon from "@mui/icons-material/UpgradeSharp";
import { Button, TextField, Typography } from "@mui/material";
import AdminResourceService from "../Admin-service/AdminResourceService";

const UpdateUserRequest = () => {
  const { id } = useParams();
  const history = useHistory();
  const [userRequest, setUserRequest] = useState({
    projectName: "",
    resourceName: "",
    quantity: "",
    startDate: "",
    endDate: "",
  });
  useEffect(() => {
    if (id) {
      getUserRequestById(id);
    }
  }, [id]);

  const getUserRequestById = async (id) => {
    let userRequest = await (await AdminResourceService.getByUserId(id)).data;
    setUserRequest(userRequest);
  };
  const handleChange = (e) => {
    setUserRequest({ ...userRequest, [e.target.placeholder]: e.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userRequest.resourceName.length) {
      return;
    }
    const newItem = { ...userRequest };
    AdminResourceService.editUserRequest(newItem, id);
    alert("UserRequest Updated Successfully");
    history.push("/userRequestView");
  };
  return (
    <div>
      <UserNavBar />
      <div className="container-fuild row m-5 pt-5 ps-5">
        <div className="col-5 row m-2">
          <Typography className="col-4 p-3" variant="button" fontSize={"large"}>
            Project :
          </Typography>
          <TextField
            placeholder="ProjectName"
            variant="outlined"
            value={userRequest.projectName}
            onChange={handleChange}
            className="pe-5 col-6"
          />
        </div>
        <div className="col-5 row m-2">
          <Typography className="col-4 p-3" variant="button" fontSize={"large"}>
            Quantity:
          </Typography>
          <TextField
            placeholder="quantity"
            variant="outlined"
            value={userRequest.quantity}
            onChange={(e) => handleChange(e)}
            className="pe-5 col-6"
          ></TextField>
        </div>
        <div className="col-5 row m-2">
          <Typography className="col-4 p-3" variant="button" fontSize={"large"}>
            StartDate:
          </Typography>
          <TextField
            placeholder="startDate"
            type="date"
            variant="outlined"
            value={userRequest.startDate}
            onChange={(e) => handleChange(e)}
            className="pe-5 col-6"
          ></TextField>
        </div>
        <div className="col-5 row m-2">
          <Typography className="col-4 p-3" variant="button" fontSize={"large"}>
            EndDate:
          </Typography>
          <TextField
            placeholder="endDate"
            type="date"
            variant="outlined"
            value={userRequest.endDate}
            onChange={(e) => handleChange(e)}
            className="pe-5 col-6"
          ></TextField>
        </div>
        <div className="col-5 m-2 p-3">
          <Button
            variant="contained"
            color="success"
            onClick={(e) => handleSubmit(e)}
            className="col-4 m-3"
          >
            Update <UpgradeSharpIcon />
          </Button>
          <Button
            variant="contained"
            color="error"
            href="/userRequestView"
            className="link col-4 m-3"
          >
            Cancel <ClearSharpIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserRequest;
