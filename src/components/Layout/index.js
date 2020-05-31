import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';

import Theme from './styles';

export default function Layout({ children }) {
  return (
    <>
      <Theme />
      <ToastContainer />
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
