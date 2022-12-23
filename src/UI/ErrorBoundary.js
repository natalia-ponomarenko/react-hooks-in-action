import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children, fallback = <h1>Something went wrong.</h1> } = this.props;
    return hasError ? fallback : children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired,
  fallback: PropTypes.node.isRequired,
}
