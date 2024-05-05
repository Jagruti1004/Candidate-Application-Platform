import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (offset: number) => {
    const response = await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          limit: 10,
          offset,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.json();
      console.log("uu", data);
      return data;
    }
  }
);

export const initialState: any = {
  jobs: [],
  total: 0,
  jobRoles: [],
  maximumExperience: 0,
  maximumMinSalary: 0,
  locations: [],
  filters:{
    jobRoles: [],
    experience: 0,
    minSalary: 0,
    locations: [],
    mode: [],
  },
  loading: false,
  error: null,
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      // state.filters = action.payload;
      console.log(action,'action')
      if(action.payload.filter === 'Roles') {
        state.filters.jobRoles = action.payload.value;
      }
      else if(action.payload.filter === 'Experience') {
        state.filters.experience = action.payload.value;
      }
      else if(action.payload.filter === 'Location') {
        state.filters.locations = action.payload.value;
      }
      else if(action.payload.filter === 'Remote') {
        state.filters.mode = action.payload.value;
      }
      else {
        state.filters.minSalary = action.payload.value;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        console.log("hello", action);
        state.loading = false;
        state.error = null;
        state.jobs = [...state.jobs, ...action.payload.jdList];
        state.total = action.payload.total;
        state.jobRoles = [
          ...(new Set(
            action.payload.jdList.map((job: any) => job.jobRole)
          ) as any),
        ];
        let maxExp = state.maximumExperience;
        action.payload.jdList.forEach((job: any) => {
          if (job.minExp > maxExp) maxExp = job.minExp;
        });
        state.maximumExperience = maxExp;
        state.locations = [
          ...(new Set(
            action.payload.jdList.map((job: any) => job.location)
          ) as any),
        ].filter((location: string) => {
          return location.toLowerCase() !== "remote";
        });
        let maxMinSalary = state.maximumMinSalary;
        action.payload.jdList.forEach((job: any) => {
          if (
            job.minJdSalary > maxMinSalary ||
            (!job.minJdSalary && job.maxJdSalary > maxMinSalary)
          )
            maxMinSalary = job.minJdSalary;
        });
        state.maximumMinSalary = maxMinSalary;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch jobs";
      });
  },
});

export const { setFilters } = jobSlice.actions;

export default jobSlice.reducer;
