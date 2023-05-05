/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { appDir: true, },
     images: {
      domains: [
        "legamart.com","images.unsplash.com" ,"plus.unsplash.com", "www.esi-sba.dz"
       
      ],
    },
   
}

module.exports = nextConfig
