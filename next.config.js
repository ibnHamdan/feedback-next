module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback = {
        fs: "empty",
        stream: "empty",
      };
    }

    return config;
  },

  //webpack(config) {
  // config.resolve.fallback = {
  //   ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
  //     // by next.js will be dropped. Doesn't make much sense, but how it is
  //   fs: false, // the solution
  //   child_process: false,
  //   net: false,
  //   os: false,
  //   tsl:
  // };
  //}
  // config.node = {
  //   fs: 'empty'
  // }

  //   return config;

  // },
};
