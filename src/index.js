import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import stores from './store';
import AppRouter from './router';

ReactDOM.render(
  <Provider {...stores}>
    <AppRouter />
  </Provider>,
  document.getElementById('root'),
);

