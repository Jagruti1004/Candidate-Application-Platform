import "./style.css";
import { Box } from "@mui/material";

function JobHeading({companyName, logoUrl, jobRole, location}: any) {
  console.log('kkk', companyName, logoUrl)
  return (
    <Box className="job-heading-box">
      <img src={logoUrl} height={32} />
      <div className="job-heading-info-container">
        <div className="job-heading-info-title">{companyName}</div>
        <div className="job-heading-info-sub-title">{jobRole}</div>
        <p>{location}</p>
      </div>
    </Box>
  );
}

export default JobHeading;
