import { Button, TextField, Typography } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AddIcon from "@mui/icons-material/Add";
import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { useHistory } from "react-router-dom";
import AdminResourceService from "../Admin-service/AdminResourceService";

const AddResource = () => {
  const [resourceName, setResourceName] = useState("");
  const [resourceQuantity, setResourceQuantity] = useState("");
  const [type, setType] = useState("");
  const [availability, setAvailability] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (isSubmit) {
      // Check if there are any errors
      if (Object.keys(formErrors).length === 0) {
        const resource = { resourceName, resourceQuantity, type, availability };
        AdminResourceService.addResource(resource)
          .then((response) => {
            console.log(response.data);
            alert("Resource has been Added");
            history.push("/viewResource");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setIsSubmit(false);
      }
    }
  }, [
    formErrors,
    isSubmit,
    history,
    resourceName,
    resourceQuantity,
    type,
    availability,
  ]);

  const validateForm = () => {
    const errors = {};

    // Validation logic for each field
    // You can customize the validation logic as needed

    if (!resourceName.trim()) {
      errors.resourceName = "Resource name is required!";
    }

    if (!resourceQuantity.trim()) {
      errors.resourceQuantity = "Resource Quantity is required!";
    }

    if (!type.trim()) {
      errors.type = "Type is required!";
    }

    if (!availability.trim()) {
      errors.availability = "Availability is required!";
    }

    setFormErrors(errors);
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();

    // If no errors, set isSubmit to true to submit the form
    if (Object.keys(errors).length === 0) {
      setIsSubmit(true);
    }
  };

  return (
    <div>
      <NavBar />
      <form onSubmit={handleSubmit}>
        <div className="container-fuild row m-5 pt-5 ps-5">
          <div className="col-5 row m-2">
            <Typography
              className="col-4 p-3"
              variant="button"
              fontSize={"large"}
            >
              RName :
            </Typography>
            <TextField
              variant="outlined"
              value={resourceName}
              onChange={(e) => {
                setResourceName(e.target.value);
              }}
              className="pe-5 col-6"
            />
            {formErrors.resourceName && (
              <Typography className="col-6 p-3" variant="caption" color="error">
                {formErrors.resourceName}
              </Typography>
            )}
          </div>
          <div className="col-5 row m-2">
            <Typography
              className="col-4 p-3"
              variant="button"
              fontSize={"large"}
            >
              Quantity:
            </Typography>
            <TextField
              variant="outlined"
              value={resourceQuantity}
              onChange={(e) => {
                setResourceQuantity(e.target.value);
              }}
              className="pe-5 col-6"
            />
            {formErrors.resourceQuantity && (
              <Typography className="col-6 p-3" variant="caption" color="error">
                {formErrors.resourceQuantity}
              </Typography>
            )}
          </div>
          <div className="col-5 row m-2">
            <Typography
              className="col-4 p-3"
              variant="button"
              fontSize={"large"}
            >
              Type:
            </Typography>
            <TextField
              variant="outlined"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
              className="pe-5 col-6"
            />
            {formErrors.type && (
              <Typography className="col-6 p-3" variant="caption" color="error">
                {formErrors.type}
              </Typography>
            )}
          </div>
          <div className="col-5 row m-2">
            <Typography
              className="col-4 p-3"
              variant="button"
              fontSize={"large"}
            >
              Availability
            </Typography>
            <TextField
              variant="outlined"
              value={availability}
              onChange={(e) => {
                setAvailability(e.target.value);
              }}
              className="pe-5 col-6"
            />
            {formErrors.availability && (
              <Typography className="col-6 p-3" variant="caption" color="error">
                {formErrors.availability}
              </Typography>
            )}
          </div>
          <div className="col-5 m-2 p-3">
            <Button
              variant="outlined"
              color="success"
              className="col-4 m-3"
              type="submit"
              disabled={isSubmit}
            >
              ADD <AddIcon />
            </Button>
            <Button
              variant="outlined"
              color="error"
              className="col-4 m-3"
              onClick={() => {
                // Reset form fields
                setResourceName("");
                setResourceQuantity("");
                setType("");
                setAvailability("");
                setFormErrors({});
                setIsSubmit(false);
              }}
            >
              RESET <RestartAltIcon />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddResource;
