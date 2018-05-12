// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';

import unLoginRedirect from '../../component/hoc/unlogin-redirect';

// 样式模块，直接用css书写
const Container = styled.div`
  background-color: #FFF;
  margin-top: 20px;
  padding: 20px;
`;


type PropType = {
}

@inject(stores => ({
  isLogin: stores.user.isLogin,
}))
@unLoginRedirect('/login')
@observer
class Personnel extends Component<PropType> {
  componentDidMount() {
    console.log('hi');
  }

  render() {
    return (
      <Container>
        <p>人事</p>
      </Container>
    );
  }
}

export default Personnel;
