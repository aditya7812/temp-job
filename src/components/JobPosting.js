import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { collection, doc,getDoc, setDoc, updateDoc } from "firebase/firestore";

const JobPosting = () => {
  const [job, setJob] = useState('');
  const [application, setApplication] = useState('');
  const [status, setStatus] = useState('');
  const {jobId} = useParams();
  const {currentUser} = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "Newusers", jobId);
      const docSnap = await getDoc(docRef);

      const applicationRef = doc(db, "Newusers", jobId, "applications", currentUser.uid)
      const applicationSnap = await getDoc(applicationRef)
      setJob(docSnap.data());
        if (applicationSnap.exists) {
          setApplication(applicationSnap.data());
          setStatus(applicationSnap.data().status);
        } else {
          console.log("Application not found");
        }
      
    };
    fetchData();
  }, []);

  const applyForJob = async () => {
    const applicationRef =  doc(db, "Newusers", jobId, "applications", currentUser.uid)

    await setDoc(applicationRef ,{
      applicantName: currentUser.displayName,
      applicantEmail: currentUser.email,
      applicantUid: currentUser.uid,
      status: "pending",
    })
    .then(() => {
      console.log("Application submitted");
    })
    .catch((error) => {
      console.error("Error submitting application: ", error);
    });
  };

  const updateApplicationStatus = async (event) => {
    
    const applicationRef =  doc(db, "Newusers", jobId, "applications", currentUser.uid)

    await updateDoc(applicationRef, {
      status: event.target.value,
    })
    .then(() => {
      console.log("Application status updated");
      setStatus(event.target.value);
    })
    .catch((error) => {
      console.error("Error updating application status: ", error);
    });
  };

  return (
    <div>
      {job ? (
        <div>
          <h1>{job.name}</h1>
          <p>{job.description}</p>
          {application ? (
            <div>
              <h2>Your application status is: {status}</h2>
              <select value={status} onChange={updateApplicationStatus}>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          ) : (
            <button onClick={applyForJob}>Apply for this job</button>
          )}
        </div>
      ) : (
        <p>Loading job posting...</p>
      )}
    </div>
  );
};

export default JobPosting;
