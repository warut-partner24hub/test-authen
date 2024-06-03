module.exports = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
                default-src 'self';
                script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com;
                style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com;
                img-src 'self' data:;
                font-src 'self';
                connect-src 'self';
                frame-src 'self';
                base-uri 'self';
                form-action 'self';
                frame-ancestors 'none';
                object-src 'none';
                upgrade-insecure-requests;
              `.replace(/\n/g, ""),
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "no-referrer",
          },
          {
            key: "Feature-Policy",
            value: "geolocation 'none'; microphone 'none'; camera 'none'",
          },
        ],
      },
    ];
  },
};
