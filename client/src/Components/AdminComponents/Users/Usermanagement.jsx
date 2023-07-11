import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import AdminHeader from "../Header/AdminHeader";
import axios from "../../../utils/axios";
import "./users.css";
import {
  adminDeleteUser,
  admingetAllusers,
  adminSearchUser,
  verifyAdminToken,
} from "../../../utils/Constants";
import { useNavigate } from "react-router-dom";
import "./userManagement.css";
import Swal from "sweetalert2";

function Usermanagement() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect((key) => {
    const Token = localStorage.getItem("admin");
    console.log(Token);
    if (!Token) {
      navigate("/admin");
      console.log("ohh toe");
    } else {
      const body = JSON.stringify({ Token });

      axios
        .post(verifyAdminToken, body, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          console.log(response);
          if (response.data.token) {
            console.log("sucess");
          } else {
            navigate("/admin");
          }
        });
    }
    getUserLists();
  }, []);

  const getUserLists = () => {
    const Token = localStorage.getItem("admin");
    console.log(Token);
    if (!Token) {
      navigate("/admin");
      console.log("ohh toe");
    } else {
      axios
        .get(admingetAllusers)
        .then((response) => {
          setUsers(response.data.users);
        })
        .catch((err) => {
          console.log(err);
          console.log("oops user catch client");
        });
    }
  };

  const userSearch = (e) => {
    let userr = e.target.value;
    console.log(userr);
    if (!userr) {
      getUserLists();
    } else {
      axios.get(`${adminSearchUser}/${userr}`).then((res) => {
        setUsers(res.data.users);
      });
    }
  };

  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${adminDeleteUser}/${id}`).then((res) => {
          getUserLists();
        });
        Swal.fire("Deleted!", "User has been deleted.", "success");
      }
    });
  };

  return (
    <div>
      <AdminHeader />
      <br />

      <br />
      <input
        class="form-control mb-3 w-25 searchadmin"
        onChange={userSearch}
        name="query"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <button class=" addButtonAdmin" onClick={() => navigate("/adminAddUser")}>
        add
      </button>

      <table id="customers">
        <tr>
          <th>No</th>
          <th>User Name</th>
          <th>Email</th>
          <th>Action</th>
          <th>Action</th>
        </tr>

        {users.map((obj, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{obj.userName}</td>
            <td>{obj.email}</td>
            <td>
              <BiEdit
                className="edit"
                onClick={() => navigate(`/updateUser/${obj._id}`)}
              />
            </td>
            <td>
              <MdDelete
                className="delete"
                onClick={() => deleteUser(obj._id)}
              />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Usermanagement;
