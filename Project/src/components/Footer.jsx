import React from "react";

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer__wrap"></div>
      </div>
      &copy; All Rights Reserved {new Date().getFullYear()}
    </footer>
  );
}

export default Footer;
