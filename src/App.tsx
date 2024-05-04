import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Grid } from '@mui/material';
import JobCard from './components/JobCard';

function App() {

  const [jobsList, setJobsList] = useState<any>([])
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const body = JSON.stringify({
    "limit": 10,
    "offset": 0
   });
   
   const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body
   };

   useEffect(()=>{
    fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
     .then((response) => response.text())
     .then((result) => {console.log(JSON.parse(result)); setJobsList(JSON.parse(result).jdList)})
     .catch((error) => console.error(error));},[])

     console.log('hello', jobsList)
  return (
    <div className="App">
      <div className='page-container'>
    <Grid container spacing={2}>
      {
        jobsList?.map((data:any)=>{
          return(
            <Grid item xs={4}>
            <JobCard job={data}/>
           </Grid>
          );
        })
      }
    </Grid>
    </div>
    </div>
  );
}

export default App;
