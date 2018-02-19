import React from 'react';
import footerLogo from '../../assets/images/footerlogo.png'
import './footer.css';

const Footer = () => {
  return (
      <div className="footer p-5">
        <a className="logo" href="http://www.cnergres.iitkgp.ac.in/aclakg/">
          <img src={footerLogo} alt="Logo"/>
        </a>
        <p>
          ACL Anthology is a database of NCL paper which is continuously
          updated and maintained. This is a project made by scholars and
          students of
          <a href="http://www.iitkgp.ac.in"> IIT Kharagpur</a>
          <br />
          Copyright © IIT Kharagpur and CNERG Research Group
        </p>
      </div>
  )
}

export default Footer;
