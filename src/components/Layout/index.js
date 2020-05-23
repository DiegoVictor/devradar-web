import React from 'react';
import PropTypes from 'prop-types';

import Theme from './styles';

export default function Layout({ children }) {
  return (
    <>
      <Theme />
      {children}
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};
