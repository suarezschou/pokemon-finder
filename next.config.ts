module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.example.com', // Keep your existing entry
        port: '',
        pathname: '/account123/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com', // For Pokemon sprites
        port: '',
        pathname: '/PokeAPI/sprites/master/sprites/**', // Adjust as needed
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'pokeapi.co', // For general PokeAPI data
        port: '',
        pathname: '/api/v2/**',
        search: '',
      },
    ],
  },
};