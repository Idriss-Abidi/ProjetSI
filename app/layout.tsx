import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "ECS",
  description: "Gestion des stages App",
};

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <head></head>
//       <script src="fullcalendar/lang/es.js"></script>

//       <body className="relative">
//         {/* <NavBar /> */}
//         {children}
//         {/* <Footer /> */}
//       </body>
//     </html>
//   );
// }
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
