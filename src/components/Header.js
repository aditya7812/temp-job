import { useNavigate } from "react-router-dom"
import "./Header.css"
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
export default function Header({isEmployer}) {
  const {currentUser} = useAuth()
  const  navigate = useNavigate();
  const handlePostJob = () => {
    navigate("/post-jobs")
  }

    return (
        <div className="header">
        <div className="logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M512 503.5H381.7a48 48 0 01-45.3-32.1L265 268.1l-9-25.5 2.7-124.6L338.2 8.5l23.5 67.1L512 503.5z"
              fill="#0473ff"
              data-original="#28b446"
            />
            <path
              xmlns="http://www.w3.org/2000/svg"
              fill="#0473ff"
              data-original="#219b38"
              d="M361.7 75.6L265 268.1l-9-25.5 2.7-124.6L338.2 8.5z"
            />
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M338.2 8.5l-82.2 234-80.4 228.9a48 48 0 01-45.3 32.1H0l173.8-495h164.4z"
              fill="#0473ff"
              data-original="#518ef8"
            />
          </svg>
          JobScan
        </div>
        <div className="header-menu">
        <a href="/nice" className="active">Find Job</a>
          <Link to='./my-jobs'>My Jobs</Link>
          <a href="/bye">Find Salaries</a>
        </div>
        <div className="user-settings">
          <div className="dark-light">
            <svg
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          </div>
          <div className="user-menu">
            {/*<svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-square"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    </svg>*/}
          </div>
          <img
            className="user-profile"
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%283%29+%281%29.png"
            alt=""
          />
          {isEmployer ? 
          <button className="search-buttons card-buttons register" onClick={handlePostJob}>Post Job</button> 
            : <button className="search-buttons card-buttons register" ><Link to={`/users/${currentUser.uid}`}>Update Profile</Link></button>}
          {/*<div className="user-name">Suhayel Nasim</div>*/}
        </div>
      </div> 
    )
}