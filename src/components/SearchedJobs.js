import React, { useEffect, useState } from 'react';
import JobCards from "./JobCards";
import "./SearchedJobs.css"
import {collection, getDocs} from 'firebase/firestore';
import { db } from '../firebase';


export default function SearchedJobs() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "Newusers"));
      //const data = await db.collection('NewUsers').get();
      console.log(querySnapshot)
      setJobs(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      //setJobs(querySnapshot.forEach((doc) => ({ ...doc.data(), id: doc.id})))
      console.log(jobs)
      //setJobs(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);
    return (
        <div className="searched-jobs">
          <div className="job-cards">
           {jobs.map((job) => (
        <JobCards key={job.id} jobData={job} />
      ))}
      </div>
            {/*<div className="searched-bar">
              <div className="searched-show">Showing 46 Jobs</div>
              <div className="searched-sort">
                Sort by: <span className="post-time">Newest Post </span
                ><span className="menu-icon">▼</span>
              </div>
    </div>
            <JobList/>*/}
        </div>
    )
    
};
