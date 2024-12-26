import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import Login from "./login";
import axios from "axios";

const Home = () => {
    // const navigator = useNavigate();
    // const [auth, setAuth] = useState(false);
    // useEffect(async () => {
    //   const respond = await axios.get('http://localhost:5000/auth', { withCredentials: true });
    //   if (respond.data.decoded) {
    //     setAuth(true);
    //   } else {
    //     setAuth(false);
    //   }
    // }, []);

    return (
        <div className={styles.homePageBody}>
            {/* Navbar */}
            <nav>
                <div className={styles.navbar}>
                    <img src="./bg1_1.png" className={styles.logo} alt="Logo" />
                    <div className={styles.navbar__logo}>
                        <a href="#about-us">About Us</a>
                        <a href="#contact-us" style={{ marginLeft: "20px" }}>Contact Us</a>
                    </div>
                </div>
            </nav>

            {/* Login Section */}
            <div className={styles.loginWrapper}>
                <Login />
            </div>

            <div className={styles.homePageContent}>
                {/* About Us Section */}
                <div id="about-us" className={styles.section}>
        <h2>About Us</h2>
        <p>
          Founded in 2024, our company is dedicated to innovation and excellence in technology solutions. 
          We are a passionate team of developers, designers, and problem-solvers committed to creating 
          cutting-edge applications that make a real difference in people's lives.
        </p>
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
          <p>
            Our mission is to leverage technology to solve complex challenges and improve 
            user experiences across various industries. We believe in the power of innovative 
            design, clean code, and user-centric approaches to create meaningful digital solutions.
          </p>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Our Values</h3>
          <ul className="list-disc pl-5">
            <li>
              Innovation: We constantly push the boundaries of what's possible in technology.
            </li>
            <li>
              Integrity: We maintain the highest standards of honesty and transparency in all our work.
            </li>
            <li>
              Collaboration: We believe the best solutions come from diverse teams working together.
            </li>
          </ul>
        </div>
      </div>

      {/* Contact Us Section */}
      <div id="contact-us" className={styles.section}>
        <h2>Contact Us</h2>
        <p className="mb-4">
          We're always excited to hear from potential clients, partners, and talented individuals 
          who want to make a difference through technology.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">General Inquiries</h3>
            <p>
              <strong>Email:</strong> info@ourcompany.com<br />
              <strong>Phone:</strong> (555) 123-4567
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">Business Partnerships</h3>
            <p>
              <strong>Email:</strong> partnerships@ourcompany.com<br />
              <strong>Phone:</strong> (555) 987-6543
            </p>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Office Location</h3>
          <address className="not-italic">
            123 Innovation Drive<br />
            Tech City, TC 54321<br />
            United States
          </address>
        </div>
        
        <div className="mt-4">
          <p className="italic text-gray-600">
            We typically respond to all inquiries within 1-2 business days.
          </p>
        </div>
      </div>
            </div>
        </div>
    );
};

export default Home;
