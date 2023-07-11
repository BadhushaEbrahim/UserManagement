import React, { useEffect } from 'react'
import { useNavigate,NavLink } from 'react-router-dom'
import './Header.css';
import axios from '../../../utils/axios'
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { change } from '../../../Redux/usernameReducer';
import { changeImage } from '../../../Redux/userimageReducer';
import { verifyUserToken } from '../../../utils/Constants';



function Header() {

    const navigate = useNavigate();
    const dispatch=useDispatch();
    const handleLogoutUser = (e) => {
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
                localStorage.clear();
                dispatch({ type: 'logout' })
                navigate('/')
            }
        })
    }

    useEffect(() => {

        const Token = localStorage.getItem('token');

        if (!Token) {
            navigate('/');

        } else {
            const body = JSON.stringify({ Token });
            axios.post(verifyUserToken, body, { headers: { "Content-Type": "application/json" } }).then((res) => {
                // if (res.data.token) {
                    dispatch(change(res.data.user.userName))
                    dispatch(changeImage(res.data.user.image))
                // } else {
                //     localStorage.removeItem('token');
                // }
            })
        }
    },  [dispatch]);

    const username = useSelector((state) => state.username)
    const userImage = useSelector((state) => {
        return state.userImage;

    })
    return (
        <nav className="navbar">
        <div className="nav-container">
        <li className="nav-item">
        <NavLink class="navbar-brand" to="/home" style={{color:'white'}}>
        <img src={userImage} alt="userImg" className='userLogo' style={{width:'70pxpx', height:'70px',borderRadius:'20%'}}/>
                  </NavLink>
            </li>
          <NavLink exact to="/home" className="nav-logo">
          {username}
            <i className="fas fa-code"></i>
          </NavLink>
        
          <ul className="nav-menu">
            
           
            <li className="nav-item">
              <NavLink
                exact
                to="/profile"
                activeClassName="active"
                className="nav-links"
              
              >
                Profile
              </NavLink>
            </li>
            <li>
          <button className='userLogoutButton' onClick={handleLogoutUser} type="submit">logout</button>
            </li>
          </ul>
          <div className="nav-icon">
         
          </div>
        </div>
        </nav>
    )
}

export default Header

