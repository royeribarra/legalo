const nextConfig = {
    env: {
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_NAME: process.env.DB_NAME,
        BASE_APP_URL: process.env.BASE_APP_URL,
        BASE_APP_API_URL: process.env.BASE_APP_API_URL
    },
    images: {
        domains: ['www.example.com', 'cdn.example.org', 'images.example.net'],
    },
};

module.exports = nextConfig;
