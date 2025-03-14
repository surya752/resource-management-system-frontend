import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import AdminResourceService from "../Admin-service/AdminResourceService";
import NavBar from "./NavBar";

const UserRequestAllocations = () => {
  const [userRequests, setUserRequests] = useState([]);

  useEffect(() => {
    getAllUserRequest();
  }, []);

  const getAllUserRequest = () => {
    AdminResourceService.getAllUserRequest()
      .then((response) => {
        setUserRequests(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAllocateResource = (id) => {
    // Show confirmation popup
    const confirmAllocation = window.confirm(
      "Do you want to allocate this resource?"
    );
    if (confirmAllocation) {
      console.log("Allocating resource for ID:", id);
      AdminResourceService.allocateResource(id)
        .then((response) => {
          console.log("Resource allocated successfully:", response.data);
          alert("Resource has been Allocated");
          // Update userRequests state to reflect the allocation status
          setUserRequests((prevUserRequests) =>
            prevUserRequests.map((req) =>
              req.id === id ? { ...req, allocated: true } : req
            )
          );
        })
        .catch((error) => {
          console.error("Error allocating resource:", error);
          // Handle error cases
        });
    } else {
      // Do nothing if allocation is not confirmed
    }
  };
  const handleDeAllocateResource = (id) => {
    if (!id) {
      console.error("Invalid resource ID");
      return;
    }

    // Show confirmation popup
    const confirmDeallocation = window.confirm(
      "Do you want to deallocate this resource?"
    );
    if (confirmDeallocation) {
      console.log("Deallocating resource for ID:", id);
      // Call deAllocateResource service method
      AdminResourceService.deAllocateResource(id)
        .then((response) => {
          console.log("Resource deallocated successfully:", response.data);
          alert("Resource has been Deallocated");
          // Update userRequests state to reflect the deallocation status
          setUserRequests((prevUserRequests) =>
            prevUserRequests.map((req) =>
              req.id === id ? { ...req, allocated: false } : req
            )
          );
        })
        .catch((error) => {
          console.error("Error deallocating resource:", error);
          // Handle error cases
        });
    } else {
      // Do nothing if deallocation is not confirmed
    }
  };

  return (
    <div>
      <NavBar />
      <div className="row" style={{ backgroundColor: "azure" }}>
        {userRequests.map((userRequest) => (
          <Card
            sx={{ minWidth: 275, backgroundColor: "azure" }}
            className="col-4 m-5 jcard"
            key={userRequest.id}
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
                Resource Name: {userRequest.resourceName}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Quantity: {userRequest.quantity}
                <br />
                StartDate: {userRequest.startDate}
                <br />
                EndDate: {userRequest.endDate}
              </Typography>
              <Typography variant="body2">
                IsAllocated: {userRequest.allocated ? "true" : "false"}
                <br />
                AllocatedDate: {userRequest.allocatedDate}
              </Typography>
            </CardContent>
            <CardActions className="row">
              <div className="col-6">
                {!userRequest.allocated && (
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() => handleAllocateResource(userRequest.id)}
                  >
                    Allocated
                  </Button>
                )}
                {userRequest.allocated && (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeAllocateResource(userRequest.id)}
                  >
                    Deallocated
                  </Button>
                )}
              </div>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserRequestAllocations;
