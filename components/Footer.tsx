import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => (
  <footer className="footer footer-center bg-base-200 text-primary-content p-10">
    <aside>
      {/* Corrected Image Tag */}
      <Image src="/logo_app.png" alt="App Logo" width={100} height={100} />

      {/* Footer Content */}
      <p className="font-bold">
        ENSIAS
        <br />
        Idriss EL ABIDI & Omar Mandri
      </p>
      <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
    </aside>
  </footer>
);

export default Footer;
