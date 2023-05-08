import React, { useEffect, useState } from 'react';
//import './JobList.css'
import {collection, getDocs} from 'firebase/firestore';
import { db } from '../firebase';

import JobCards from './JobCards'


  

const JobList = () => {
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
    <>
      
      {jobs.map((job) => (
        <JobCards key={job.id} jobData={job} />
      ))}
    </>
  );
};

export default JobList;
