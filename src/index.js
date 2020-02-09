import React from 'react';
import ReactDOM from 'react-dom';

import '~/config/ReactotronConfig';
import App from '~/components/pages/Dashboard/index';
import Style from '~/styles';

ReactDOM.render(
  <>
    <Style />
    <App />
  </>,
  document.getElementById('root')
);
