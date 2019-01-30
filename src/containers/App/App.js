import React from 'react';
import * as TYPES from 'prop-types';
import { connect } from 'react-redux';

import { Container } from '../../components/App';
import { Warning } from '../../components/common';
import Base from '../Base/';
import Quote from '../Quote/';

App.propTypes = {
  isLoading: TYPES.bool.isRequired,
  isReceived: TYPES.bool.isRequired
};

function App ({ isLoading, isReceived }) {
  const content = [
    <Base key={ 1 } />,
    <Quote key={ 2 } />
  ];
  const warning = <Warning message='Unable to fetch user data' />;
  const node = isReceived ? content : warning;

  return (
    <Container isDisplayed={ !isLoading }>
      { node }
    </Container>
  );
}

const mapStateToProps = ({ currencies: { isLoading, isReceived } }) => ({
  isLoading,
  isReceived
});

export default connect(
  mapStateToProps
)(App);
