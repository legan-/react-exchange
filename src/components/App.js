import React from 'react';
import { connect } from 'react-redux';

import From from '../containers/From';
import To from '../containers/To';


const App = () => (
  <div className='container'>
    <h2>Exchange</h2>
    <From />
    <To />
  </div>
);

export default connect()(App);