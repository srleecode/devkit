const { startDevServer } = require('@cypress/webpack-dev-server');
const { AngularCompilerPlugin } = require('@ngtools/webpack');

module.exports = (on, config) => {
  on('dev-server:start', async (options) =>
    startDevServer({
      options,
      webpackConfig: {
        /* Performance boost. */
        devtool: false,
        resolve: {
          extensions: ['.js', '.ts'],
        },
        module: {
          rules: [
            {
              test: /\.ts$/,
              loader: '@ngtools/webpack',
            },
            /* Use raw-loader as AngularCompilerPlugin handles the rest. */
            {
              test: /\.css$/,
              loader: 'raw-loader',
            },
            /* Use raw-loader as AngularCompilerPlugin handles the rest. */
            {
              test: /\.scss$/,
              use: ['raw-loader', 'sass-loader'],
            },
          ],
        },
        plugins: [
          new AngularCompilerPlugin({
            directTemplateLoading: true,
            tsConfigPath: config.env.tsConfig,
            sourceMap: false,
            forkTypeChecker: true,
          }),
        ],
      },
    })
  );

  // config.env.reactDevtools = true;

  // IMPORTANT to return the config object
  // with the any changed environment variables
  return config;
};
