import React from "react";
import "../Pages/Home.css";
import Desktop from "../Images/Desktop.jpeg";
import Laptop from "../Images/Laptop.png";
import MainNavBar from "../Navbar/NavBar";

function Home() {
  return (
    <div>
      <MainNavBar />
      <section className="rooms sec-width" id="rooms">
        <div className="title">
          <h2>Resources</h2>
        </div>
        <div className="rooms-container">
          <article className="room">
            <div className="room-image">
              <img src={Laptop} alt="Laptop" />
            </div>
            <div className="room-text">
              <a href="/userlogin" className="room-text">
                <h3>Laptops</h3>
              </a>
            </div>
          </article>
          {/* <!-- end of single room -->
        <!-- single room --> */}

          <article className="room">
            <div className="room-image">
              <img src={Desktop} alt="Laptop" />
            </div>
            <div className="room-text">
              <a href="/userlogin" className="room-text">
                <h3>Desktop</h3>
              </a>
            </div>
          </article>
          {/* <!-- end of single room --> */}
        </div>
      </section>
      <div className="footer">
        <div className="footer-container">
          <div>
            <h2>About Us </h2>
            <p>
              System lets allocate IT resources to the various software
              development and other teams in the company. The IT resources
              includes all the Hardware and Software required by teams e.g.
              laptops, desktop, VMs, Software licences, Hard Disk, Projector
              etc.
            </p>
          </div>
          <div>
            <h2>Have A Question</h2>
            <div className="contact-item">
              <span>
                <i className="fas fa-map-marker-alt"></i>
              </span>
              <span>Rajahmundry , East Godavari , Andhra Pradesh</span>
            </div>
            <div className="contact-item">
              <span>
                <i className="fas fa-phone-alt"></i>
              </span>
              <span>+xxxxxxxxxxxxxxx</span>
            </div>
            <div className="contact-item">
              <span>
                <i className="fas fa-envelope"></i>
              </span>
              <span>suryarekhapalli752@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          copyright &copy; <a href="/"> Surya Rekhapalli</a>{" "}
        </p>
      </div>
    </div>
  );
}

export default Home;
