import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Grid } from "@mui/material";
import JobCard from "./components/JobCard";
import CustomizedHook from "./Select";
import {useDispatch, useSelector} from 'react-redux';
import { RootState } from "./redux/store";
import { fetchJobs } from "./redux/slices/jobSlice";

function App() {
  const dispatch = useDispatch<any>();
  const {jobs, loading, error} = useSelector((state: RootState)=>state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
  },[dispatch]);

  return (
    <div className="App">
      <div className="page-container">
        {/* <CustomizedHook options={jobRoles} id="job-roles" label="Roles" multiSelect={true}/> */}
        <Grid container spacing={2}>
          {jobs?.map((data: any) => {
            return (
              <Grid item xs={4}>
                <JobCard job={data} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
}

export default App;
