import React, { useState } from 'react';
import './TempPage.css'
import { useAuth } from '../contexts/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';

export default function TempPage(params) {
    const [profileImg, setProfileImg] = useState(null);
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('');
  
  const [pincode, setPincode] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [resume, setResume] = useState(null);
  const {currentUser} = useAuth()
  

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setProfileImg(e.target.files[0]);
    }
  };

  const handleResumeChange = (e) => {
    if (e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // upload image to firebase storage
    
    const imageRef = ref(storage, `images/${currentUser.uid}`)
    const imageSnap = await uploadBytes(imageRef, profileImg)
    const imageUrl = await getDownloadURL(imageSnap.ref)

    const resumeRef = ref(storage, `resumes/${currentUser.uid}`)
    const resumeSnap = await uploadBytes(resumeRef, resume)
    const resumeUrl = await getDownloadURL(resumeSnap.ref)
    // upload resume to firebase storage

    // create employee profile document in firebase firestore
    await setDoc(doc(db, 'employeeProfile', currentUser.uid), {
      imageUrl,
      fullName,
      mobileNumber,
      email,
      gender,
      nationality,
      pincode,
      birthdate,
      resumeUrl,
      'userId': currentUser.uid 
    }
   
    )
  }

    return (
        <div className='main-container2'>
        <div className="container3">
      <header>Registration Form</header>
      <form className="form2" onSubmit={handleSubmit}>
        <div className="input-box">
          <label>Full Name</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter full name" required />
        </div>

        
        <div className="column">
        <div className="input-box">
          <label>Email Address</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email address" required />
        </div>
        <div className="input-box">
            <label>Phone Number</label>
            <input type="number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} placeholder="Enter phone number" required />
          </div>
        </div>

        <div className="column">
        <div className="input-box">
            <label>Gender</label>
            <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Gender" required />
        </div>
          <div className="input-box">
            <label>Birth Date</label>
            <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} placeholder="Enter birth date" required />
          </div>
        </div>
        
        
        
          <div className="column">
            <div className="input-box">
                <label>Nationality</label>
                <input type="text" value={nationality} onChange={(e) => setNationality(e.target.value)} placeholder="Enter nationality" required />
            </div>
            <div className="input-box">
                <label>Postal Code</label>
                <input type="number" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="Enter Pincode" required />
            </div>
          </div>
        <div className="column">
          <div className="input-box">
            <label>Profile Image</label>
            <input className="filebox" type="file" onChange={handleImageChange} />
          </div>
          <div className="input-box">
            <label>Upload Your CV</label>
            <input className="filebox" type="file" onChange={handleResumeChange} />
          </div>
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
    </div>
    )
    
};
