// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { notification } from 'antd';

import history from '../../component/History';
import { PanelContainer as Container } from '../../component/base-style-component';
import Form, { loginInForm } from './component/login-form';
import loginRedirect from '../../component/hoc/login-redirect';

type Props = {
  user: Object,
}

const LogoWrapper = styled.div`
  margin-bottom: 25px;
  text-align: center;
`;

const Logo = styled.h3`
  font-size: 32px;
`;
const Wrapper = styled.div`
  min-height: 800px;
  position: relative;
`;

@inject(stores => ({
  user: stores.user,
  nav: stores.nav,
  isLogin: stores.user.isLogin,
}))
@loginRedirect('/task')
@observer
export default class Login extends Component<Props> {
  constructor(props: Props) {
    super(props);
    loginInForm.$hooks.onSuccess = (form) => {
      const { user } = this.props;
      const { login } = user;
      return new Promise(async (resolve) => {
        try {
          await login(form.values());
          notification.success({ message: '登录成功' });
          history.push('/task');
        } catch (e) {
          notification.error({ message: e.message });
        } finally {
          resolve();
        }
      });
    };
    loginInForm.$hooks.onError = (form) => {
      console.log(form.errors());
    };
  }

  render() {
    return (
      <Wrapper>
        <Container>
          <LogoWrapper>
            <Logo>民兵管理系统</Logo>
          </LogoWrapper>
          <Form form={loginInForm} />
        </Container>
      </Wrapper>
    );
  }
}
