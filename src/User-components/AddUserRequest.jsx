import { Button, TextField, Typography } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import AddIcon from "@mui/icons-material/Add";
import React, { useState, useEffect } from "react";
import UserNavBar from "./UserNavBar";
import { useHistory } from "react-router-dom";
import AdminResourceService from "../Admin-service/AdminResourceService";

const AddUserRequest = () => {
  const [projectName, setProjectName] = useState("");
  const [resourceName, setResourceName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const history = useHistory();

  // Function to validate the form
  const validateForm = () => {
    const errors = {};

    // Validation logic for each field
    if (!projectName.trim()) {
      errors.projectName = "Project Name is required!";
    }

    if (!resourceName.trim()) {
      errors.resourceName = "Resource Name is required!";
    }

    if (!quantity.trim()) {
      errors.quantity = "Quantity is required!";
    }

    if (!startDate.trim()) {
      errors.startDate = "Start Date is required!";
    }

    if (!endDate.trim()) {
      errors.endDate = "End Date is required!";
    }

    setFormErrors(errors);
    return errors;
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();

    // If there are no errors, submit the form
    if (Object.keys(errors).length === 0) {
      const userRequest = {
        projectName,
        resourceName,
        quantity,
        startDate,
        endDate,
      };
      AdminResourceService.addUserRequest(userRequest)
        .then((response) => {
          console.log(response.data);
          alert("UserRequest has been Added");
          history.push("/userRequestView");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // useEffect to handle form submission after validation
  useEffect(() => {
    if (isSubmit) {
      handleSubmit();
    }
  }, [isSubmit]);

  return (
    <div>
      <UserNavBar />
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <div className="container-fuild row m-5 pt-5 ps-5">
          <div className="col-5 row m-2">
            <Typography
              className="col-4 p-3"
              variant="button"
              fontSize={"large"}
            >
              Project :
            </Typography>
            <TextField
              variant="outlined"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="pe-5 col-6"
            />
            {formErrors.projectName && (
              <Typography className="col-6 p-3" variant="caption" color="error">
                {formErrors.projectName}
              </Typography>
            )}
          </div>

          <div className="col-5 row m-2">
            <Typography
              className="col-4 p-3"
              variant="button"
              fontSize={"large"}
            >
              Resource:
            </Typography>
            <TextField
              variant="outlined"
              value={resourceName}
              onChange={(e) => setResourceName(e.target.value)}
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
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="pe-5 col-6"
            />
            {formErrors.quantity && (
              <Typography className="col-6 p-3" variant="caption" color="error">
                {formErrors.quantity}
              </Typography>
            )}
          </div>

          <div className="col-5 row m-2">
            <Typography
              className="col-4 p-3"
              variant="button"
              fontSize={"large"}
            >
              StartDate:
            </Typography>
            <TextField
              variant="outlined"
              placeholder="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="pe-5 col-6"
            />
            {formErrors.startDate && (
              <Typography className="col-6 p-3" variant="caption" color="error">
                {formErrors.startDate}
              </Typography>
            )}
          </div>

          <div className="col-5 row m-2">
            <Typography
              className="col-4 p-3"
              variant="button"
              fontSize={"large"}
            >
              EndDate:
            </Typography>
            <TextField
              variant="outlined"
              placeholder="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="pe-5 col-6"
            />
            {formErrors.endDate && (
              <Typography className="col-6 p-3" variant="caption" color="error">
                {formErrors.endDate}
              </Typography>
            )}
          </div>

          {/* Add Button */}
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
                // Reset form fields and errors
                setProjectName("");
                setResourceName("");
                setQuantity("");
                setStartDate("");
                setEndDate("");
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

export default AddUserRequest;
