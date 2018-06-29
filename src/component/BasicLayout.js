// @flow
import React from 'react';
import { Layout, Menu, Button } from 'antd';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';

import history from '../component/History';

const { Header, Content, Footer } = Layout;

// 样式模块，直接用css书写
const HeaderTitle = styled.h1`
  color: white;
  font-size: 22px;
  font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
  font-weight: normal;
  margin-right: 50px;
`;

const HeaderExtendGroup = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  .default_icon {
    margin-left: 10px;
  }
`;

type PropType = {
    children: Object,
    nav: Object
}

function Test(props: PropType) {
  const { children, nav } = props;
  return (
    <Layout className="layout">
      <Header style={{ display: 'flex', flexDirection: 'row' }}>
        <HeaderTitle>民兵管理系统</HeaderTitle>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={nav.selectedKey.slice()}
          style={{ lineHeight: '64px' }}
          onClick={(item) => {
             console.log(props, item.key);
             nav.setSelectedKey(item.key);
              switch (item.key) {
                  case 'nav_1': {
                      history.push('/task');
                      break;
                  }
                  case 'nav_2': {
                      history.push('/personnel');
                      break;
                  }
                  case 'nav_3': {
                      history.push('/message');
                      break;
                  }
                  case 'nav_4': {
                    history.push('/organization');
                    break;
                  }
                  default:
                      break;
              }
          }}
        >
          <Menu.Item key="nav_1">任务管理</Menu.Item>
          <Menu.Item key="nav_2">人事管理</Menu.Item>
          <Menu.Item key="nav_3">消息管理</Menu.Item>
          <Menu.Item key="nav_4">组织管理</Menu.Item>
        </Menu>
        <HeaderExtendGroupWithInject />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        { children }
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <span role="img">©️</span>2018 SYSU. All Rights Reserved.
      </Footer>
    </Layout>
  );
}

const HeaderExtendGroupComponent = ({ user, nav }) => {
  return (
    <HeaderExtendGroup>
      {user.isLogin ? (
        <Button
          type="primary"
          icon="logout"
          size="small"
          onClick={() => {
            user.logout();
          }}
        >
          登出
        </Button>
      ) : null}
    </HeaderExtendGroup>
  );
};

const HeaderExtendGroupWithInject = inject(stores => ({
  user: stores.user,
  nav: stores.nav,
}))(observer(HeaderExtendGroupComponent));

export default inject(stores => ({
  nav: stores.nav,
}))(observer(Test));
