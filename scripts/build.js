import webpack from 'webpack';
import config from '~/config/webpack.config.prod';
import chalk from 'chalk';

/* eslint-disable no-console */

const compiler = webpack(config);

console.log(chalk.blue('\nGenerating minified bundle for production...\n'));

compiler.run((err, stats) => {
  if (err) {
    console.log(chalk.red(err));
    return 1;
  }

  const options = {
    chunks: false,
    chunkModules: false,
    modules: false,
    children: false,
    color: true,
  };

  const jsonStats = stats.toJson();

  if (stats.hasErrors()) {
    jsonStats.errors.map(error => console.log(chalk.red(error)));
  }

  if (stats.hasWarnings()) {
    console.log(chalk.yellow('Webpack generated the following warnings:'));
    jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));
  }

  console.log(`\nWebpack stats:\n${ stats.toString(options) }`);

  console.log(chalk.green('\nApp has been built for production and written to /build\n'));

  return 0;
});
