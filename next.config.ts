// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   domains: ["cdn.imagin.studio"]
//   /* config options here */
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.imagin.studio"], // Move 'domains' under 'images'
  },
  /* Add any other config options here */
};

export default nextConfig;
