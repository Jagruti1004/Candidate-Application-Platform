import "./style.css";
import { Box, Button } from "@mui/material";

type props = {
  minExp: number;
  jdLink: string;
};

function JobFooter({ minExp, jdLink }: props) {
  return (
    <Box className="job-card-footer">
      <a href={jdLink}>View Job</a>
      <div className="job-card-footer-experience">
        <div className="job-card-footer-experience-title">
          Minimum Experience
        </div>
        <div className="job-card-footer-experience-value">{minExp} years</div>
      </div>
      <Button className="job-card-footer-easy-apply-button">
        ⚡ Easy Apply
      </Button>
    </Box>
  );
}

export default JobFooter;
