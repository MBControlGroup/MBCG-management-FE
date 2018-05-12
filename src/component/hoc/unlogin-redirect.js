// @flow
import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';

// This function takes a component...
export default function unLoginRedirect(path) {
  // ...and returns another component...
  return WrappedComponent =>
    observer(class extends React.Component {
      render() {
        const { isLogin, ...otherProsp } = this.props;
        if (isLogin) {
          return <WrappedComponent {...otherProsp} />
        }
        return (
          <Redirect
            to={{
                pathname: path,
                state: { from: this.props.location },
              }}
          />
        );
      }
    })
}
