import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, observer } from 'mobx-react';
import { create } from 'mobx-persist';

import stores from './store';
import AppRouter from './router';

@observer
class Index extends Component {
  componentDidMount() {
    const hydrate = create();
    // const { user } = stores;
    hydrate('store user', stores.user).then((data) => {
      if (data.isLogin) {
        // nav.init()
      }
    });
  }

  render() {
    return (
      <Provider {...stores}>
        <AppRouter />
      </Provider>
    );
  }
}


ReactDOM.render(
  <Index />,
  document.getElementById('root'),
);

