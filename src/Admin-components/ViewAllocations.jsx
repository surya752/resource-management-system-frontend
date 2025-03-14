import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AdminResourceService from "../Admin-service/AdminResourceService";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import NavBar from "./NavBar";

const ViewAllocations = () => {
  const [allocations, setAllocations] = useState([]);
  const { resourceName } = useParams();

  useEffect(() => {
    getAllAllocations();
  }, []);

  const getAllAllocations = () => {
    AdminResourceService.getAllAllocations()
      .then((response) => {
        if (response.data.length == 0) {
          alert("No Allocations");
        } else {
          setAllocations(response.data);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteAllocation = (id) => {
    AdminResourceService.deleteAllocation(id)
      .then((response) => {
        alert("Allocation Deleted");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <NavBar />
      <div className="row" style={{ backgroundColor: "azure" }}>
        {allocations.map((allocation) => {
          if (allocation.resourceName == resourceName) {
            return (
              <Card
                sx={{ minWidth: 275, backgroundColor: "azure" }}
                className="col-3 m-5 jcard"
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    ID :{allocation.id}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 20 }}
                    color="text.primary"
                    gutterBottom
                  >
                    ProjectName : {allocation.projectName}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Quantity : {allocation.quantity}
                  </Typography>
                  <Typography variant="body2">
                    AllocatedDate :{allocation.allocatedDate}
                  </Typography>
                  <Typography variant="body2">
                    DeAllocatedDate :{allocation.deAllocatedDate}
                  </Typography>
                </CardContent>
                {/* <CardActions>
                  <Button size="medium" variant='outlined' color='error' onClick={() => deleteAllocation(allocation.id)} className='ms-5'>Delete</Button>
                </CardActions> */}
              </Card>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ViewAllocations;
