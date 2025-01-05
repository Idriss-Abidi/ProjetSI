module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/stage/all',          // Local path to capture
        destination: 'http://89.168.40.93/stage/all',  // API destination URL
          },
        ]
      },
  };