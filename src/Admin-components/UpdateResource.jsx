import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import UpgradeSharpIcon from "@mui/icons-material/UpgradeSharp";
import { Button, TextField, Typography } from "@mui/material";
import AdminResourceService from "../Admin-service/AdminResourceService";

const UpdateResource = () => {
  const { id } = useParams();
  const history = useHistory();
  const [resource, setResource] = useState({
    resourceName: "",
    resourceQuantity: "",
    type: "",
    availability: [false, true],
  });

  useEffect(() => {
    if (id) {
      getResourceById(id);
    }
  }, [id]);

  const getResourceById = async (id) => {
    let resource = await (await AdminResourceService.getById(id)).data;
    setResource(resource);
  };
  const handleChange = (e) => {
    setResource({ ...resource, [e.target.placeholder]: e.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!resource.resourceName.length) {
      return;
    }
    const newItem = { ...resource };
    AdminResourceService.editResource(newItem, id);
    alert("Resource Updated Successfully");
    history.push("/viewResource");
  };
  return (
    <div>
      <NavBar />
      <div className="container-fuild row m-5 pt-5 ps-5">
        <div className="col-5 row m-2">
          <Typography className="col-4 p-3" variant="button" fontSize={"large"}>
            RName :
          </Typography>
          <TextField
            placeholder="ResourceName"
            variant="outlined"
            value={resource.resourceName}
            onChange={handleChange}
            className="pe-5 col-6"
          />
        </div>
        <div className="col-5 row m-2">
          <Typography className="col-4 p-3" variant="button" fontSize={"large"}>
            Quantity:
          </Typography>
          <TextField
            placeholder="resourceQuantity"
            variant="outlined"
            value={resource.resourceQuantity}
            onChange={(e) => handleChange(e)}
            className="pe-5 col-6"
          ></TextField>
        </div>
        <div className="col-5 row m-2">
          <Typography className="col-4 p-3" variant="button" fontSize={"large"}>
            Type:
          </Typography>
          <TextField
            placeholder="type"
            variant="outlined"
            value={resource.type}
            onChange={(e) => handleChange(e)}
            className="pe-5 col-6"
          ></TextField>
        </div>
        <div className="col-5 row m-2">
          <Typography className="col-4 p-3" variant="button" fontSize={"large"}>
            Availability:
          </Typography>
          <TextField
            placeholder="availability"
            variant="outlined"
            value={resource.availability}
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
            href="/viewResource"
            className="link col-4 m-3"
          >
            Cancel <ClearSharpIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateResource;
