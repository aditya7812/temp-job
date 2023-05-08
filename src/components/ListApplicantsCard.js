import { db } from "../firebase"
import { doc, updateDoc } from "firebase/firestore"
import { Link } from "react-router-dom"

export default function ListApplicantsCard({jobData, jobId}) {
    const handleStatusChange = async (jobId, applicantId, newStatus) => {
    const applicationRef =  doc(db, "Newusers", jobId, "applications", applicantId)

    await updateDoc(applicationRef, {
      status: newStatus,
    })
}
    return (
        <tr>
            <td>{jobData.applicantName}</td>
            <td>{jobData.applicantEmail}</td>
            <td><Link to={`/users/${jobData.id}`}>Profile</Link></td>
            <td><button
                      onClick={() =>
                        handleStatusChange(jobId, jobData.id, "Accepted")
                      }
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        handleStatusChange(jobId, jobData.id, "Rejected")
                      }
                    >
                      Reject
                    </button></td>
        </tr>
    )
    
};
