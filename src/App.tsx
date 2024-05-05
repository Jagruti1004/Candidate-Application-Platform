import React, { useEffect, useState, useCallback } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Box, CircularProgress, Grid } from "@mui/material";
import JobCard from "./components/JobCard";
import CustomizedHook from "./Select";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { fetchJobs, initialState } from "./redux/slices/jobSlice";

function App() {
  const dispatch = useDispatch<any>();
  const {
    jobs,
    jobRoles,
    maximumExperience,
    maximumMinSalary,
    locations,
    filters,
    loading,
    error,
  } = useSelector((state: RootState) => state.jobs);
  const [currentJobs, setCurrentJobs] = useState([]);
  const [page, setPage] = useState(0);

  const fetchMoreJobs = useCallback(() => {
    dispatch(fetchJobs((page + 1) * 10));
    setPage((prevPage) => prevPage + 1);
  }, [dispatch, page]);

  useEffect(() => {
    dispatch(fetchJobs(0));
  }, []);

  useEffect(() => {
    if (jobs.length > 0) {
      if (filters !== initialState.filters) {
        let filtered = jobs;
        if (filters.jobRoles.length > 0) {
          filtered = filtered.filter((job: any) => {
            return Boolean(
              filters.jobRoles.find((role: string) => role === job.jobRole)
            );
          });
        }
        if (filters.locations.length > 0) {
          filtered = filtered.filter((job: any) => {
            return Boolean(
              filters.locations.find((role: string) => role === job.location)
            );
          });
        }

        if (filters.experience > 0) {
          filtered = filtered.filter((job: any) => {
            return job.minExp <= filters.experience;
          });
        }

        if (Number(filters.minSalary.split(" LPA")[0]) > 0) {
          filtered = filtered.filter((job: any) => {
            return (
              (job.minJdSalary &&
                job.minJdSalary >=
                  Number(filters.minSalary.split(" LPA")[0])) ||
              (!job.minJdSalary &&
                job.maxJdSalary >= Number(filters.minSalary.split(" LPA")[0]))
            );
          });
        }

        if (filters.mode.length > 0 && filters.mode.length !== 2) {
          filtered =
            filters.mode === "remote"
              ? filtered.filter((job: any) => {
                  return "remote" !== job.location;
                })
              : filtered.filter((job: any) => {
                  return "remote" === job.location;
                });
        }
        setCurrentJobs(filtered);
      } else setCurrentJobs(jobs);
    }
  }, [jobs]);

  useEffect(() => {
    console.log("filters", filters);
    if (jobs.length > 0) {
      let filtered = jobs;
      if (filters.jobRoles.length > 0) {
        filtered = filtered.filter((job: any) => {
          return Boolean(
            filters.jobRoles.find((role: string) => role === job.jobRole)
          );
        });
      }
      if (filters.locations.length > 0) {
        console.log("i am inside locations");
        filtered = filtered.filter((job: any) => {
          return Boolean(
            filters.locations.find(
              (location: string) => location === job.location
            )
          );
        });
      }
      if (filters.experience > 0) {
        console.log("i am inside experience");
        filtered = filtered.filter((job: any) => {
          return job.minExp <= filters.experience;
        });
      }
      if (Number(filters.minSalary.split(" LPA")[0]) > 0) {
        console.log("i am inside salary");
        filtered = filtered.filter((job: any) => {
          return (
            (job.minJdSalary &&
              job.minJdSalary >= Number(filters.minSalary.split(" LPA")[0])) ||
            (!job.minJdSalary &&
              job.maxJdSalary >= Number(filters.minSalary.split(" LPA")[0]))
          );
        });
      }

      if (filters.mode.length > 0 && filters.mode.length !== 2) {
        filtered =
          filters.mode === "remote"
            ? filtered.filter((job: any) => {
                return "remote" !== job.location;
              })
            : filtered.filter((job: any) => {
                return "remote" === job.location;
              });
      }
      setCurrentJobs(filtered);
    }
  }, [filters]);

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
          <Grid container spacing={2} marginBottom={6}>
            <Grid item sm={3} xs={12}>
              <CustomizedHook
                options={jobRoles}
                id="job-roles"
                label="Roles"
                multiSelect={true}
              />
            </Grid>
            <Grid item sm={3} xs={12}>
              <CustomizedHook
                options={Array.from(
                  { length: maximumExperience + 1 },
                  (v, k) => k
                )}
                id="job-experience"
                label="Experience"
                multiSelect={false}
              />
            </Grid>
            <Grid item sm={3} xs={12}>
              <CustomizedHook
                options={locations}
                id="job-locations"
                label="Location"
                multiSelect={true}
              />
            </Grid>
            <Grid item sm={3} xs={12}>
              <CustomizedHook
                options={["remote", "on-site"]}
                id="job-working-model"
                label="Remote"
                multiSelect={true}
              />
            </Grid>
            <Grid item sm={3} xs={12}>
              <CustomizedHook
                options={Array.from(
                  { length: Math.floor(maximumMinSalary / 10) + 1 },
                  (v, k) => `${k * 10} LPA`
                )}
                id="job-salary"
                label="Min Base Pay"
                multiSelect={false}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {currentJobs.map((data: any) => {
              return (
                <Grid item sm={4} xs={12}>
                  <JobCard job={data} />
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}
      {loading && (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}

export default App;
