import fs from 'fs';
export default ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'strapi'),
      user: env('DATABASE_USERNAME', 'strapi'),
      password: env('DATABASE_PASSWORD', 'strapi'),
      ssl: {
        // Add one of these options:
        rejectUnauthorized: false, // Option 1: Disable certificate verification (less secure)
        // ca: fs.readFileSync('/path/to/your/ca-certificate.pem') // Option 2: Proper certificate
      },
    },
    debug: false,
  },
});