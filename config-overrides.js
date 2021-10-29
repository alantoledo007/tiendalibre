const { alias, configPaths } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    ...configPaths('./jsconfig.paths.json'),
  })(config);
  require('react-app-rewire-postcss')(config, {
    plugins: [require('tailwindcss'), require('autoprefixer')],
  });
  return config;
};
