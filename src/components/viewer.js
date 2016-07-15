import React, { Component, PropTypes } from 'react';

export default class Viewer extends Component {
  componentDidMount() {
    // do stuff
  }
  render() {
    return <p>Test</p>;
  }
}

Viewer.propTypes = {
  presentation: PropTypes.object,
};
