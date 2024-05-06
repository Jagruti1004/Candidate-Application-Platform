import { useMemo } from "react";
import DetailPill from "../DetailPill";
import JobFooter from "../JobFooter";
import JobHeading from "../JobHeading";
import "./style.css";
import { Card, Typography } from "@mui/material";

function JobCard({ job }: any) {
  const salaryText = useMemo(() => {
    if (job.minJdSalary && job.maxJdSalary)
      return `${job.minJdSalary} - ${job.maxJdSalary} LPA`;
    else return `${job.maxJdSalary || job.minJdSalary} LPA`;
  }, [job.minJdSalary, job.maxJdSalary]);
  return (
    <Card variant="outlined" className="job-card-box">
      <div className="job-card-tags">
        <DetailPill />
      </div>
      <div className="job-card-section">
        <JobHeading
          companyName={job.companyName}
          logoUrl={job.logoUrl}
          jobRole={job.jobRole}
          location={job.location}
        />
        <Typography fontSize={14} fontWeight={400}>
          Estimated Salary: &#8377;{salaryText}
          <span> ✅</span>
        </Typography>
        <div className="job-card-about-title">About Company</div>
        <div className="job-card-about-sub-title">
          <strong>About us</strong>
        </div>
        <div className="job-card-about">{job.jobDetailsFromCompany}</div>
        <JobFooter minExp={job.minExp} jdLink={job.jdLink} />
      </div>
    </Card>
  );
}

export default JobCard;
