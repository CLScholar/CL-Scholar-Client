import React from 'react';
import footerLogo from '../../assets/images/footerlogo2.png'
import './footer.css';

const Footer = () => {
  return (
      <div className="footer p-5">
        <a className="logo" href="http://www.cnergres.iitkgp.ac.in/aclakg/">
          <img src={footerLogo} alt="Logo"/>
        </a>
        <p>
          CL Scholar is a fully automated analytics and search engine for
          papers in Computational Linguistics Community. This website is developed
          and maintained by CNeRG Research Group of IIT Kharagpur
          <br />
          Copyright © <a href="http://www.iitkgp.ac.in"> IIT Kharagpur</a> and
          <a href="http://www.cnergres.iitkgp.ac.in/"> CNERG Research Group</a>
        </p>
      </div>
  )
}

export default Footer;
