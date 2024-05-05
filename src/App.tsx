import React, { useEffect, useState, useCallback } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Grid } from "@mui/material";
import JobCard from "./components/JobCard";
import CustomizedHook from "./Select";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { fetchJobs } from "./redux/slices/jobSlice";

function App() {
  const dispatch = useDispatch<any>();
  const { jobs, jobRoles, loading, error } = useSelector(
    (state: RootState) => state.jobs
  );
  const [currentJobs, setCurrentJobs] = useState([]);
  const [page, setPage] = useState(0);

  const fetchMoreJobs = useCallback(() => {
    dispatch(fetchJobs((page + 1) * 10));
    setPage((prevPage) => prevPage + 1);
  }, [dispatch, page]);

  useEffect(() => {
    dispatch(fetchJobs(0));
  }, [dispatch]);

  useEffect(() => {
    console.log(jobs, "mc");
    if (jobs.length > 0) setCurrentJobs(jobs);
  }, [jobs]);

  useEffect(() => {
    const handleScroll = () => {
      console.log("here");
      if (
        window.innerHeight + document.documentElement.scrollTop <
          document.documentElement.offsetHeight - 50 ||
        loading
      )
        return;
      console.log("here2");
      fetchMoreJobs();
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, fetchMoreJobs]);

  return (
    <div className="App">
      {currentJobs.length > 0 && (
        <div className="page-container">
          <CustomizedHook
            options={jobRoles}
            id="job-roles"
            label="Roles"
            multiSelect={true}
          />
          <Grid container spacing={2}>
            {currentJobs.map((data: any) => {
              return (
                <Grid item xs={4}>
                  <JobCard job={data} />
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}
      {loading && <div>Loading</div>}
    </div>
  );
}

export default App;
