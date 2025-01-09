import Image from "next/image";
import React from "react";

const Footer = () => (
  <div className="flex flex-col min-h-screen">
    {/* Main content of the page */}
    <main className="flex-grow">
      {/* Your main content goes here */}
    </main>

    {/* Footer */}
    <footer className="footer footer-center bg-base-200 text-primary-content p-10 mt-auto">
      <aside className="text-center">
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
  </div>
);

export default Footer;
