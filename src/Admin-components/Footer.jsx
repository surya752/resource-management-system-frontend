import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import DraftsIcon from "@mui/icons-material/Drafts";
import CopyrightIcon from "@mui/icons-material/Copyright";

function Footer() {
  return (
    <div>
      <Card>
        <CardContent className="row " sx={{ backgroundColor: "black" }}>
          <Typography className="col-6" sx={{ color: "white" }}>
            <div align="left">
              all rights reserved <CopyrightIcon /> 2022 Bed Portal
            </div>
          </Typography>
          <Typography className="col-6" sx={{ color: "white" }}>
            <div align="right">
              <FacebookIcon />
              <TwitterIcon />
              <YouTubeIcon />
              <DraftsIcon />
            </div>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Footer;
