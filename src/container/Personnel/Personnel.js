// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { Button, message, Tree } from 'antd';

import unLoginRedirect from '../../component/hoc/unlogin-redirect';
import PersonnelAreaQuery from './component/Personnel-area-query';
import PersonnelQueryForm from './component/Personnel-query-form';
import PersonnelTable from './component/Personnel-table';

const TreeNode = Tree.TreeNode;

// 样式模块，直接用css书写
const Container = styled.div`
  background-color: #FFF;
  margin-top: 20px;
  padding: 20px;
  overflow: hidden;
`;

type PropType = {
  isLogin: boolean,
  nav: Object,
  personnel: Object
}

@inject(stores => ({
  isLogin: stores.user.isLogin,
  nav: stores.nav,
  personnel: stores.personnel
}))
@unLoginRedirect('/login')
@observer
class Personnel extends Component<PropType> {
  constructor(props: PropType) {
    super(props);
    try {
      this.props.personnel.getOrgs();
    } catch (err) {
      console.log(err);
    } finally {
      console.log("finished");
    }
  }
  componentWillMount() {
    this.props.nav.setSelectedKey('nav_2');
  }
  loop = (areaData) => {
    return areaData.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.flag ? <span style={{ color: '#009922' }}>{item.title}</span> : item.title} key={item.key} dataRef={item}>
            {this.loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  }
  render() {
    const { selectedAreaKey, areaData } = this.props.personnel;
    console.log(areaData);
    return (
      <Container>
        <Tree
          defaultExpandAll
          showLine
          defaultSelectedKeys={["0"]}
          onSelect={this.onSelect}
          onCheck={this.onCheck}
        >
          {this.loop(areaData)}
        </Tree>
      </Container>
    );
  }
}

export default Personnel;
