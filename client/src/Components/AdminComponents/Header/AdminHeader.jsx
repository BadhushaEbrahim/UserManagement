import React from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminHeader.css';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';
function AdminHeader() {

  const navigate=useNavigate();


  const adminLogout1=(e) => {
    e.preventDefault();
    Swal.fire({
        title: 'Logout?',
        text: "Do you want to Logout?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Logout'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('admin')
            navigate('/admin')
        }
    })
}
  return (
    <nav className="navbar">
    <div className="nav-container">
      <NavLink exact to="/adminHome" className="nav-logo">
      WELCOME ADMIN
        <i className="fas fa-code"></i>
      </NavLink>
    
      <ul className="nav-menu">
      <li className="nav-item">
              <NavLink
                exact
                to="/users"
                activeClassName="active"
                className="nav-links"
              
              >
                view all users
              </NavLink>
            </li>
        <li>
        <button class="adminLogoutBtn" onClick={adminLogout1} >Logout</button>
        </li>
      </ul>
      <div className="nav-icon">
     
      </div>
    </div>
    </nav>
  )
}

export default AdminHeader

