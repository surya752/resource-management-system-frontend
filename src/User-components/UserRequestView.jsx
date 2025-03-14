import { Card, CardActions, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FcExternal } from "react-icons/fc";
import "../User-components/navbar.css";
import AdminResourceService from "../Admin-service/AdminResourceService";
import UserNavBar from "./UserNavBar";

const UserRequestView = () => {
  const [userRequests, setUserRequest] = useState([]);

  useEffect(() => {
    getAllUserRequest();
  }, []);

  const getAllUserRequest = () => {
    AdminResourceService.getAllUserRequest()
      .then((response) => {
        setUserRequest(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <UserNavBar />
      <div className="row" style={{ backgroundColor: "azure" }}>
        {userRequests.map((userRequest) => (
          <Card
            sx={{ minWidth: 275, backgroundColor: "azure" }}
            className="col-4 m-5 jcard"
          >
            <CardContent>
              <Typography variant="h5" component="div">
                {userRequest.projectName}
              </Typography>
              <Typography
                sx={{ fontSize: 20 }}
                color="text.primary"
                gutterBottom
              >
                Resource Name : {userRequest.resourceName}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Quantity : {userRequest.quantity}
                <br />
                StartDate : {userRequest.startDate}
                <br />
                EndDate : {userRequest.endDate}
              </Typography>
              <Typography variant="body2">
                IsAllocted : {userRequest.allocated ? "true" : "false"}
                <br />
                AllocatedDate : {userRequest.allocatedDate}
              </Typography>
            </CardContent>
            <CardActions className="row">
              <div className="col-6">
                <Link
                  className="btn btn-outline-success"
                  to={`/updateUserRequest/${userRequest.id}`}
                >
                  <FcExternal />
                  Resource
                </Link>
              </div>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserRequestView;
