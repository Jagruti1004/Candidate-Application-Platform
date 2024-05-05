import "./style.css";
import { Box } from "@mui/material";

type props = {
 companyName: string;
 logoUrl: string;
 jobRole: string;
 location: string;
}

function JobHeading({ companyName, logoUrl, jobRole, location }: props) {
  return (
    <Box className="job-heading-box">
      {logoUrl && <img src={logoUrl} />}
      <Box>
        <div className="job-heading-info-company">{companyName}</div>
        <div className="job-heading-info-role">{jobRole}</div>
        <p className="job-heading-info-location">{location}</p>
      </Box>
    </Box>
  );
}

export default JobHeading;
