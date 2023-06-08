import React from 'react';
import './Footer.css';

function Footer({handleAreaSelect}) {
  return (
    <section id="footer" onClick={handleAreaSelect}>
      <a href="https://www.flaticon.com/free-icons/weather" title="weather icons" target="_blank">Weather icons created by Freepik - Flaticon</a>
    </section>
  )
}

export default Footer;