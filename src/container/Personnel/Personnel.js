// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react';
import { Button, Input, Modal, Icon, Upload, message } from 'antd';

import unLoginRedirect from '../../component/hoc/unlogin-redirect';
import PersonnelAreaQuery from './component/Personnel-area-query';
import PersonnelQueryForm from './component/Personnel-query-form';
import PersonnelTable from './component/Personnel-table';


// 样式模块，直接用css书写
const Container = styled.div`
  background-color: #FFF;
  margin-top: 20px;
  padding: 20px;
  overflow: hidden;
`;


const Data = styled.div`
  margin-top: -10px;
  float: right;
`;

// 水平垂直居中
const RowInput = styled.div`
  display:flex;
  justify-content:space-between;
  align-items: right;
  margin-bottom: 20px;
`;

const files = {
  name: 'file',
  ListType: 'text',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};


type PropType = {
  isLogin: boolean,
  nav: Object
}

@inject(stores => ({
  isLogin: stores.user.isLogin,
  nav: stores.nav
}))
@unLoginRedirect('/login')
@observer
class Personnel extends Component<PropType> {
  componentWillMount() {
    this.props.nav.setSelectedKey('nav_2');
  }


  state = {
    modal1Visible: false,
    modal2Visible: false
  }

  setModal1Visible(modal1Visible) {
    this.setState({modal1Visible});
  }
  setModal2Visible(modal2Visible) {
    this.setState({modal2Visible});
  }

  render() {
    return (
      <Container>
        <Data>
          <Button type='primary' style={{ margin: '0 5px'}} 
          onClick={()=>this.setModal1Visible(true)}>新增</Button>
          <Button type='ghost' style={{ margin: '0 5px' }}>
            <Icon type='download' />批量导出
          </Button>
          <Upload {...files}>
            <Button type='ghost' style={{ margin: '0 5px'}} >
              <Icon type='upload' />批量导入
            </Button>
          </Upload>    
        </Data>
        <span>区域　</span>
        <PersonnelAreaQuery />
        <PersonnelQueryForm />

        <PersonnelTable />

        <Modal
          title='新建人员'
          visible={this.state.modal1Visible}
          onOk={()=>this.setModal1Visible(false)}
          onCancel={()=>this.setModal1Visible(false)}
        >
          <RowInput>
            <span>姓名　</span><Input type='text' placeholder='请输入' style={{width:'380px'}}/>
          </RowInput>
          <RowInput>
            <span>手机号码　</span><Input type='text' placeholder='请输入' style={{width:'380px'}}/>
          </RowInput>
          <RowInput>
            <span>身份证号码　</span><Input type='text' placeholder='请输入' style={{width:'380px'}}/>
          </RowInput>
          <RowInput>
            <span>所属分支　</span><PersonnelAreaQuery />
          </RowInput>
        </Modal>
      

      </Container>
    );
  }
}

export default Personnel;
