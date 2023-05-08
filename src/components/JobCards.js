import "./JobCards.css"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function JobCards ({ jobData }) {
  const jobId = jobData.id;
  const {currentUser} = useAuth();
  const handleApplyJob = async () => {
      const employeeRef =  doc(db, "employeeProfile", currentUser.uid)
      const employeeSnap = await getDoc(employeeRef);
      console.log(employeeSnap.data())
      const applicationRef =  doc(db, "Newusers", jobId, "applications", currentUser.uid)
  
      await setDoc(applicationRef ,{
        applicantName: employeeSnap.data().fullName,
        applicantEmail: employeeSnap.data().email,
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
  
  return (
    
      <div className="job-card">
        <div className="job-card-header">
          <svg
            viewBox="0 -13 512 512"
            xmlns="http://www.w3.org/2000/svg"
            style={{backgroundColor: "#2e2882"}}
          >
            <g fill="#feb0a5">
              <path
                d="M256 92.5l127.7 91.6L512 92 383.7 0 256 91.5 128.3 0 0 92l128.3 92zm0 0M256 275.9l-127.7-91.5L0 276.4l128.3 92L256 277l127.7 91.5 128.3-92-128.3-92zm0 0"
              />
              <path d="M127.7 394.1l128.4 92 128.3-92-128.3-92zm0 0" />
            </g>
            <path
              d="M512 92L383.7 0 256 91.5v1l127.7 91.6zm0 0M512 276.4l-128.3-92L256 275.9v1l127.7 91.5zm0 0M256 486.1l128.4-92-128.3-92zm0 0"
              fill="#feb0a5"
            />
          </svg>
          <div className="menu-dot"></div>
        </div>
        <div className="job-card-title">{jobData.name}</div>
        <div className="job-card-subtitle">
          The User Experience Designer position exists to create
          compelling and digital user experience through excellent
          design...
        </div>
        <div className="job-detail-buttons">
          <button className="search-buttons detail-button">
            {jobData.jobType}
          </button>
          <button className="search-buttons detail-button">
            {jobData.location}
          </button>
          <button className="search-buttons detail-button">
            {jobData.jobRole}
          </button>
        </div>
        <div className="job-card-buttons">
          <button className="search-buttons card-buttons"><Link to={`/jobs/${jobId}`}>View</Link></button>
          <button className="search-buttons card-buttons-msg" onClick={handleApplyJob}>Apply{/*<Link to={`applyjob/${jobId}`}>
            Apply
            </Link>*/}
          </button>
        </div>
      </div>
    
  )
};

