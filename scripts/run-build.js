import express from 'express';
import open from 'open';
import compression from 'compression';
import chalk from 'chalk';

import config from '~/config';
import path from '~/config/paths';

/* eslint-disable no-console */

const app = express();

app.use(compression());
app.use(express.static(path.build));

app.get('/', (req, res) => {
  res.sendFile(path.build + '/index.html');
});

app.listen(config.buildPort, err => {
  if (err) {
    console.error('\nerror', err);
  } else {
    const url = `${ config.host }:${ config.buildPort }`;
    console.log(chalk.green(`\nProduction is running on ${ url }`));
    open(url);
  }
});
