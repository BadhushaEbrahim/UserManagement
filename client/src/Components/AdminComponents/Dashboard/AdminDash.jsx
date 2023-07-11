import React, { Fragment } from "react";
import AdminHeader from "../Header/AdminHeader";
import "./AdminDash.css";

function AdminDash() {
  return (
    <Fragment>
      <AdminHeader />
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="adminDash"
              src="image/adminDash.png"
              alt="DashBoard"
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AdminDash;
