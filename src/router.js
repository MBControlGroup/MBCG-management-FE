import * as React from 'react';
import Loadable from 'react-loadable';
// import { Switch, Route, Redirect } from 'react-router';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
// import { observer, inject } from 'mobx-react';
import history from './component/History';
import BasicLayout from './component/BasicLayout';


const TestScreen = Loadable({
  loader: () => import('./container/Test/Test'),
  loading: () => (<p>loading...</p>),
});

const LoginScreen = Loadable({
  loader: () => import('./container/Login/Login'),
  loading: () => (<p>loading...</p>),
});

const TaskScreen = Loadable({
  loader: () => import('./container/Task/Task'),
  loading: () => (<p>loading...</p>),
});

const PersonnelScreen = Loadable({
  loader: () => import('./container/Personnel/Organization'),
  loading: () => (<p>loading...</p>),
});

const MessageScreen = Loadable({
  loader: () => import('./container/Message/Message'),
  loading: () => (<p>loading...</p>),
});

const TaskDetailScreen = Loadable({
  loader: () => import('./container/TaskDetail/TaskDetail'),
  loading: () => (<p>loading...</p>),
});


class AppRouter extends React.Component {
  constructor(props) {
    super();
    console.log(props);
  }
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/login" component={LoginScreen} />
          <BasicLayout>
            <Route exact path="/task" component={TaskScreen} />
            <Route exact path="/task-detail/:id" component={TaskDetailScreen} />
            <Route exact path="/personnel" component={PersonnelScreen} />
            <Route exact path="/message" component={MessageScreen} />
          </BasicLayout>
          <Redirect to="/task" />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
