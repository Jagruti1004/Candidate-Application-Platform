import DetailPill from "../DetailPill";
import JobHeading from "../JobHeading";
import "./style.css";
import { Button, Card, Typography } from "@mui/material";

function JobCard({ job }: any) {
  console.log(job.companyName, "joss");
  return (
    <Card variant="outlined" className="job-card-box">
      <div className="job-card-tags">
        <DetailPill />
      </div>
      <div className="job-card-mid">
        <JobHeading
          companyName={job.companyName}
          logoUrl={job.logoUrl}
          jobRole={job.jobRole}
          location={job.location}
        />
        <Typography fontSize={14} fontWeight={400}>
          Estimated Salary: {job.minJdSalary}-{job.maxJdSalary}Lpa
          <span>Icon</span>
        </Typography>
        <div className="job-card-about-title">About Company</div>
        <div className="job-card-about-sub-title">
          <strong>About us</strong>
        </div>
        <div className="job-card-about">{job.jobDetailsFromCompany}</div>
        <div className="job-card-footer">
          <div className="job-card-footer-view-job">View Job</div>
          <div className="job-card-footer-experience">
            <div className="job-card-footer-experience-title">
              Minimum Experience
            </div>
            <div className="job-card-footer-experience-value">
              {job.minExp} years
            </div>
          </div>
          <Button className="job-card-footer-easy-apply-button">
            ⚡ Easy Apply
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default JobCard;
