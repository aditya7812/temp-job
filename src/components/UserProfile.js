import React, { useState } from 'react';
import './UserProfile.css'
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


export default function UserProfile() {
    
  const {userId} = useParams()
  const {currentUser} = useAuth()

  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
    const querySnapshot = await getDoc(doc(db, "employeeProfile", userId));
      //const data = await db.collection('NewUsers').get();
      console.log(querySnapshot)
      setUser(querySnapshot?.data())
      //setJobs(querySnapshot.forEach((doc) => ({ ...doc.data(), id: doc.id})))
      console.log(user)
      //setJobs(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);
  

  

  
    return (
        <div className='main-container2'>
        <div className="container3">
          {user ? <>
      <header>User Profile</header>
      <div className='align-neatly'>
        <div className='firstBox'>
      <div className='profileImg'>
        <a href={user?.imageUrl} target='_blank'>
        <img width='150px' src={user?.imageUrl} alt="" />
        </a>
      </div>
      </div>
      <div className="form2" >
        <div className="input-box">
          <label>Full Name</label>
          <div className='userdata'>{user?.fullName}</div>
        </div>

        
        <div className="column">
        <div className="input-box">
          <label>Email Address</label>
          <div className='userdata'>{user?.email}</div>
        </div>
        <div className="input-box">
            <label>Mobile Number</label>
            <div className='userdata'>{user?.mobileNumber}</div>
          </div>
        </div>

        <div className="column">
        <div className="input-box">
            <label>Gender</label>
            <div className='userdata'>{user?.gender}</div>
        </div>
          <div className="input-box">
            <label>Birth Date &#40;yyyy/dd/mm&#41;</label>
            <div className='userdata'>{user?.birthdate}</div>
          </div>
        </div>
        
          <div className="column">
            <div className="input-box">
                <label>Nationality</label>
                <div className='userdata'>{user?.nationality}</div>
            </div>
            <div className="input-box">
                <label>Postal Code</label>
                <div className='userdata'>{user?.pincode}</div>
            </div>
          </div>
        <button type='button'><a href={user?.resumeUrl} target='_blank' className='no-design'>See Resume</a></button>
        {userId == currentUser.uid ? <button type='button'>Update Profile</button> : ''}
        
      </div>
     
    </div></> : <button type='button' className='createprofile'>Create Profile</button>}
    </div>
    </div>
    )
    
};
