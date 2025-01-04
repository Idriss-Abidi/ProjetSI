import "./globals.css";

export const metadata = {
  title: "GestionStages",
  description: "Gestion des stages App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">
        {/* <NavBar /> */}
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
