import React from 'react';
import ReactDOM from 'react-dom';

import '~/config/ReactotronConfig';
import Dashboard from '~/pages/Dashboard';

ReactDOM.render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>,
  document.getElementById('root')
);
